var schedule = require('node-schedule');
var reckon = require('./reckon');

// Schedule shape: {householdId: job}
var schedules = {};

var createMonthlyReckoning = function(householdId) {
  var job = schedule.scheduleJob(`${getRandomOf60()} ${getRandomOf60()} ${getRandomMorningHour()} * * *`,
        reckon.bind(null, householdId));
  schedules[householdId] = job;
};

var getRandomOf60 = function() {
  return Math.floor(Math.random() * 60);
};

var getRandomMorningHour = function() {
  return Math.floor(Math.random() * 4);
};

var clearMonthlyReckoning = function(householdId) {
  var job = schedules[householdId];
  return schedule.cancelJob(job);
};

module.exports = {
  createMonthlyReckoning,
  clearMonthlyReckoning,
};
