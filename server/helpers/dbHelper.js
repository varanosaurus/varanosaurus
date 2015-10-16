var db = require('../db/interface.js');


var userFunctions = {};
var householdFunctions = {};
var reconciliationFunctions = {};
var listEntryFunctions = {};

userFunctions.add = function(username, password) {

  return db.User.find({where: {name: username}})
    .then(function(user) {
      if (user) {
        return 'User already exists';
      } else {
        return db.User.create({username: username, password: password});
      }
    })
    .catch(function(error) {
      console.error(error);
      return 'Error';
    });

};

module.exports = {
  user: userFunctions,
  household: householdFunctions,
  reconciliation: reconciliationFunctions,
  listEntry: listEntryFunctions
};