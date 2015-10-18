var db = require('../db/interface');

var reckon = function(householdId) {

  return db.Household.findById(householdId, {
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
        where: {reckoningId: null},
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


      return db.Item
        .sum('price', {where: {householdId: household.id}})
        .then(function(sum) {
          return {household, sum};
        });

    })

    .then(function(results) {

      // throw new Error(JSON.stringify(results));

      var household = results.household;
      var totalSpent = results.sum;

      var userCount = household.users.length;

      var share = totalSpent / userCount;

      var userStats = household.users.reduce(function(collection, user) {
        collection[user.id] = {user, contribution: 0, debt: share};
        return collection;
      }, {});

      household.items.forEach(function(item) {
        var user = userStats[item.buyingUserId];
        user.contribution += +item.price;
        user.debt -= +item.price;
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
              var i;

              for (i in u) {
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
      throw err;
    });

};

module.exports = reckon;
