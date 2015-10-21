process.env['NODE_ENV'] = 'testing';
var request = require('request');
var url = 'http://localhost:8080/api/users/';
var db = require('../../server/db/interface');
var householdUrl = 'http://localhost:8080/api/households';

//really-need lets us easily clear node's cache
//after each test so that we can have a clean
//server instance before the next text
var needRequire = require('really-need');

describe('userRouter', function() {

  var server;

  beforeEach(function(done) {

    var context = this;
    this.headers = {'content-type': 'application/json'};

    server = needRequire('../../server/server', {bustCache: true, keep: false});
    db.sequelize.sync({force: true})
      .then(function() {

        //seed db with user
        var userUrl = 'http://localhost:8080/auth/signup';
        var userBody = JSON.stringify({
          username: 'nedStark',
          password: 'RPlusLEqualsJ',
        });

        request.post({url: userUrl, headers: context.headers, body: userBody}, function(error, response, body) {
          var parsedBody = JSON.parse(body);

          context.headers['X-Access-Token'] = parsedBody.token;
          context.userId = parsedBody.user.id;

          var householdBody = JSON.stringify({
            name: 'Winterfell',
          });

          request.post({url: householdUrl, headers: context.headers, body: householdBody}, function(error, response, body) {
            var parsedBody = JSON.parse(body);

            context.headers['X-Access-Token'] = parsedBody.token;
            context.householdId = parsedBody.household.id;
            done();

          });

        }); //closes post request

      }); //closes then

  }); //closes beforeEach

  afterEach(function(done) {
    server.close(done);
  });

  it('should respond to a get request with that user\'s information', function(done) {

    var context = this;

    request.get({url: url + context.userId, headers: context.headers}, function(error, response, body) {

      var parsedBody = JSON.parse(body);

      expect(parsedBody.username).toEqual('nedStark');
      expect(parsedBody.id).toEqual(1);
      done();

    });

  }); //closes 'should respond to a get request'

  it('should update a user\'s info and send back the properties that were changed', function(done) {

    var context = this;

    var updates = JSON.stringify({
      password: 'mySecretDiedWithMe',
      householdId: context.householdId,
    });

    request.put({url: url + context.userId, headers: context.headers, body: updates}, function(error, response, body) {

      var parsedBody = JSON.parse(body);

      expect(parsedBody.updates.householdId).toEqual(1);
      done();

    });

  }); //closes 'should update a user'

  it('should delete a user and send back confirmation', function(done) {

    var context = this;

    //seed database with new user

    request.del({url: url + context.userId, headers: context.headers}, function(error, response, body) {

      var parsedBody = JSON.parse(body);

      expect(parsedBody.success).toEqual(true);
      //sequelize returns a string for id; cast to a number first
      expect(+parsedBody.deletedUserId).toEqual(1);
      done();

    });

  }); //closes 'should delete a user'

}); //closes 'userRouter'
