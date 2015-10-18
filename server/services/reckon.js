var db = require('../db/interface');

var reckon = function(householdId) {

  db.Household.findById(householdId, {
    // Eagerly load some of the associated data
    // that we'll use to calculate the details of
    // the reckoning and its join table.
    include: [
      // Include the users holding a foreign key to the household.
      {
        model: db.User,
      },
      // Also include all the items associated with the household...
      {
        model: db.Item,
        // ... where there is no associated reckoning yet...
        where: {reckoning: null},
        // ... and include the users who bought the item.
        include: [
          {
            model: db.User,
            as: 'buyingUser',
          },
        ],
      },

    ],
  })

    .then(function(household) {

      return db.Items
        .sum('price', {where: {householdId: household.id}})
        .then(function(sum) {
          return {household, sum};
        });

    })

    .then(function(results) {

      var household = results.household;
      var totalSpent = results.sum;

      var userCount = household.Users.length;

      var share = totalSpent / userCount;

      var userStats = household.Users.reduce(function(collection, user) {
        collection[user.id] = {user, contribution: 0.0, debt: share};
      }, {});

      household.Items.forEach(function(item) {
        var user = userStats[item.buyingUserId];
        user.contribution += item.price;
        user.debt -= item.price;
      });

      return db.Reckoning.create({totalSpent})
        .then(function(reckoning) {
          return reckoning
            .setHousehold(household)
            .then(function() {
              return reckoning;
            })
            .then(function(reckoning) {
              var u = userStats;
              var promises = [];

              for (var i in u) {
                promises.push(reckoning.addUser(u[i].user, {contribution: u[i].contribution, debt: u[i].debt}));
              }

              return Promise.all(promises)
                      .then(function() {
                        return reckoning;
                      });
            });
        });

    })

    .catch(function(err) {
      return err;
    });

};

module.exports = reckon;
