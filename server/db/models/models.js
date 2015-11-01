var defineHousehold = require('./Household');
var defineInvitation = require('./Invitation');
var defineItem = require('./Item');
var definePayment = require('./Payment');
var defineReckoning = require('./Reckoning');
var defineUser = require('./User');
var defineUserToReckoning = require('./UserToReckoning');

module.exports = function(db) {
  defineHousehold(db);
  defineInvitation(db);
  defineItem(db);
  definePayment(db);
  defineReckoning(db);
  defineUser(db);
  defineUserToReckoning(db);
};
