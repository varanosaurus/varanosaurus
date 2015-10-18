var db = require('../db/interface');

var reckon = function(householdId) {

  var totalSpent;

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

      var userCount = household.Users.length;
      var share = totalSpent / userCount;

      var userStats = household.Users.reduce(function(collection, user) {
        collection[user.id] = {user, contribution: 0.0, debt: share};
      }, {});

      var totalSpent = household.Items.reduce(function(sum, item) {
        userStats[item.User.id].contribution += item.price;
        userStats[item.User.id].debt -= item.price;
        return sum + item.price;
      }, 0.0);


    })

    .catch(function(err) {
      return err;
    });

};

module.exports = reckon;
