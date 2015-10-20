var scheduler = require('../../server/services/scheduler');

const month = 2678400000;

var householdId = 1;

describe('Reckoning scheduler', function() {

  beforeEach(function() {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should schedule a job for the start of each month', function() {
    // This test isn't very rigorous or useful.
    // Messing around with time is confusing.
    var job = jasmine.createSpy('job');

    jasmine.clock().mockDate(new Date(1979, 0, 15));

    scheduler.createMonthlyJob(householdId, job);
    expect(job).not.toHaveBeenCalled();

    while (job.calls.count() !== 5) {
      jasmine.clock().tick(1000);
    }

    expect(job).toHaveBeenCalledWith(householdId);

  }); // Closes 'should schedule a reckoning for the start of each month'

  it('should allow clearing a job by householdId', function() {
    var job = jasmine.createSpy('job');

    jasmine.clock().mockDate(new Date(1979, 0, 15));

    scheduler.createMonthlyJob(householdId, job);
    expect(job).not.toHaveBeenCalled();

    jasmine.clock().tick(month);

    expect(job.calls.count()).toEqual(1);

    scheduler.clearMonthlyJob(householdId);

    jasmine.clock().tick(month);
    jasmine.clock().tick(month);
    jasmine.clock().tick(month);
    jasmine.clock().tick(month);
    jasmine.clock().tick(month);

    expect(job.calls.count()).toEqual(1);

  }); // Closes 'should allow clearing a job by householdId'


}); // Closes 'Reckoning scheduler'
