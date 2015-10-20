var schedule = require('node-schedule');

// Schedule shape: {householdId: job}
var schedules = {};

var createMonthlyJob = function(householdId, callback) {
  var cronSpec = `${getRandomOf60()} ${getRandomMorningHour()} 1 * *`;

  var jobFn = function() {
    callback(householdId);
  };

  schedules[householdId] = schedule.scheduleJob(cronSpec, jobFn);
};

var getRandomOf60 = function() {
  return Math.floor(Math.random() * 60);
};

var getRandomMorningHour = function() {
  return Math.floor(Math.random() * 4);
};

var clearMonthlyJob = function(householdId) {
  var job = schedules[householdId];
  return schedule.cancelJob(job);
};

module.exports = {
  createMonthlyJob,
  clearMonthlyJob,
};
