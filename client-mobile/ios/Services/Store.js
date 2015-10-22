'use strict';

var _userId;
var _householdId;
var _token;

var saveUserId = function(userId) {
  _userId = userId;
};

var saveHouseholdId = function(householdId) {
  _householdId = householdId;
};

var saveToken = function(token) {
  _token = token;
};

module.exports = {
  saveUserId,
  saveHouseholdId,
  saveToken,
};
