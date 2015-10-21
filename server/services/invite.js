var db = require('../db/interface');

var UserToHousehold = function(householdId, userId) {

  return db.Household.findById(householdId)

    .then(function(household) {
      return db.User.findById(userId)
        .then(function(user) {
          return {household, user};
        });
    })

    .then(function(results) {
      var household = results.household;
      var user = results.user;
      return db.Invitation.create({householdId: household.id, userId: user.id});
    });

};

module.exports = {
  UserToHousehold,
};
