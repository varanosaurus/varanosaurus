process.env['NODE_ENV'] = 'testing';
var request = require('request');
var url = 'http://localhost:8080/api/items/';
var db = require('../server/db/interface');

//really-need lets us easily clear node's cache
//after each test so that we can have a clean
//server instance before the next text
var needRequire = require('really-need');

describe('itemRouter', function() {

  var server;

  beforeEach(function(done) {

    var context = this;
    this.headers = {'content-type': 'application/json'};

    server = needRequire('../server/server', {bustCache: true, keep: false});
    db.sequelize.sync({force: true})
      .then(function() {

        //seed db with user and household
        var userUrl = 'http://localhost:8080/auth/signup';
        var userBody = JSON.stringify({
          accountName: 'nedStark',
          password: 'RPlusLEqualsJ',
        });

        request.post({
          url: userUrl,
          headers: context.headers,
          body: userBody,
        },
        function(error, response, body) {
          var parsedBody = JSON.parse(body);

          context.headers['X-Access-Token'] = parsedBody.token;
          context.userId = parsedBody.user.id;

          var householdUrl = 'http://localhost:8080/api/households/';
          var householdBody = JSON.stringify({
            householdName: 'Winterfell',
          });

          request.post({
            url: householdUrl,
            headers: context.headers,
            body: householdBody,
          },
          function(error, response, body) {
            var parsedBody = JSON.parse(body);

            context.headers['X-Access-Token'] = parsedBody.token;
            context.householdId = parsedBody.household.id;
            done();

          }); //closes post request for household

        }); //closes post request for user

      }); //closes then

  }); //closes beforeEach

  afterEach(function(done) {
    server.close(done);
  });

  it('should create a new item and send back the item', function(done) {

    var context = this;
    var body = JSON.stringify({description: 'valyrian steel'});

    request.post({url, headers: context.headers, body}, function(error, response, body) {

      expect(JSON.parse(body).item.description).toEqual('valyrian steel');
      done();

    });

  });

  xit('should respond to a get request with that item\'s information', function(done) {

    var context = this;

    request.get({url: url + context.userId, headers: context.headers}, function(error, response, body) {

      var parsedBody = JSON.parse(body);

      expect(parsedBody.accountName).toEqual('nedStark');
      expect(parsedBody.displayName).toEqual(null);
      expect(parsedBody.id).toEqual(1);
      done();

    });

  }); //closes 'should respond to a get request'

  xit('should update a user and send back the properties that were changed', function(done) {

    var context = this;

    var updates = JSON.stringify({
      password: 'mySecretDiedWithMe',
      displayName: 'honorableButStupid',
    });

    request.put({url: url + context.userId, headers: context.headers, body: updates}, function(error, response, body) {

      var parsedBody = JSON.parse(body);

      expect(parsedBody.updates.displayName).toBeTruthy();
      expect(parsedBody.updates.displayName).toEqual('honorableButStupid');
      done();

    });

  }); //closes 'should update a user'

  xit('should delete a user and send back confirmation', function(done) {

    var context = this;

    request.del({url: url + context.userId, headers: context.headers}, function(error, response, body) {

      var parsedBody = JSON.parse(body);

      expect(parsedBody.success).toEqual(true);
      //sequelize returns a string for id; cast to a number first
      expect(+parsedBody.deletedUserId).toEqual(1);
      done();

    });

  }); //closes 'should delete a user'

}); //closes 'userRouter'
