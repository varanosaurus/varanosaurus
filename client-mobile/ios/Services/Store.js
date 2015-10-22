'use strict';

var _userId;
var _householdId;
var _token;

var setUserId = function(userId) {
  _userId = userId;
};

var getUserId = function() {
  return _userId;
};

var setHouseholdId = function(householdId) {
  _householdId = householdId;
};

var getHouseholdId = function() {
  return _householdId;
};

var setToken = function(token) {
  _token = token;
};

var getToken = function() {
  return _token;
};

module.exports = {
  setUserId,
  getUserId,
  setHouseholdId,
  getHouseholdId,
  setToken,
  getToken,
};
