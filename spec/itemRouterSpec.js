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

  it('should respond to a get request with that item\'s information', function(done) {

    var context = this;

    var body = JSON.stringify({description: 'valyrian steel'});

    //seed with existing household first
    request.post({url, headers: context.headers, body}, function(error, response, body) {

      var parsedBody = JSON.parse(body);
      context.headers['X-Access-Token'] = parsedBody.token;
      var itemId = parsedBody.item.id;

      request.get({url: url + itemId, headers: context.headers}, function(error, response, body) {

        var parsedBody = JSON.parse(body);

        expect(parsedBody.description).toEqual('valyrian steel');

        done();

      });

    });

  }); //closes 'should respond to a get request'

  it('should update a user and send back the properties that were changed', function(done) {

    var context = this;

    var body = JSON.stringify({description: 'valyrian steel'});

    //seed with existing household first
    request.post({url, headers: context.headers, body}, function(error, response, body) {

      var parsedBody = JSON.parse(body);
      context.headers['X-Access-Token'] = parsedBody.token;
      var itemId = parsedBody.item.id;
      var updateBody = JSON.stringify({
        details: 'good for beheading, will need soon',
      });

      request.put({url: url + itemId, headers: context.headers, body: updateBody}, function(error, response, body) {

        var parsedBody = JSON.parse(body);

        expect(parsedBody.details).toEqual('good for beheading, will need soon');

        done();

      });

    });

  }); //closes 'should update a user'

  it('should delete a user and send back confirmation', function(done) {

    var context = this;

    var body = JSON.stringify({description: 'valyrian steel'});

    //seed with existing household first
    request.post({url, headers: context.headers, body}, function(error, response, body) {

      var parsedBody = JSON.parse(body);
      context.headers['X-Access-Token'] = parsedBody.token;
      var itemId = parsedBody.item.id;

      request.del({url: url + itemId, headers: context.headers}, function(error, response, body) {

        var parsedBody = JSON.parse(body);
        expect(parsedBody.success).toEqual(true);
        expect(+parsedBody.deletedItemId).toEqual(1);

        done();

      });

    });

  }); //closes 'should delete a user'

}); //closes 'userRouter'
