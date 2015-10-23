'use strict';

var _userId;
var _householdId;
var _token;

var userId = {};
userId.set = function(userId) {
  _userId = userId;
  console.log('userId was set');
};

userId.get = function() {
  return _userId;
};

var householdId = {};
householdId.set = function(householdId) {
  _householdId = householdId;
};

householdId.get = function() {
  return _householdId;
};

var token = {};
token.set = function(token) {
  _token = token;
};

token.get = function() {
  return _token;
};

module.exports = {
  userId,
  householdId,
  token,
};
