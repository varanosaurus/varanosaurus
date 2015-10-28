process.env['NODE_ENV'] = 'testing';
var request = require('request');
var url = 'http://localhost:8080/api/items/';
var db = require('../../server/db/interface');

//really-need lets us easily clear node's cache
//after each test so that we can have a clean
//server instance before the next text
var needRequire = require('really-need');

describe('itemRouter', function() {

  var server;

  beforeEach(function(done) {

    var context = this;
    this.headers = {'content-type': 'application/json'};

    server = needRequire('../../server/server', {bustCache: true, keep: false});
    db.sequelize.sync({force: true})
      .then(function() {

        //seed db with user and household
        var userUrl = 'http://localhost:8080/auth/signup';
        var userBody = JSON.stringify({
          username: 'nedStark',
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
            name: 'Winterfell',
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
      var parsedBody = JSON.parse(body);

      expect(parsedBody.item.description).toEqual('valyrian steel');
      expect(parsedBody.item.addingUserId).toEqual(1);
      done();

    });

  });

  it('should respond to a get request to /items with all the items of that household', function(done) {

    var context = this;
    var body = JSON.stringify({description: 'valyrian steel'});

    request.post({url, headers: context.headers, body}, function() {

      var body = JSON.stringify({description: 'dragon blood'});

      request.post({url, headers: context.headers, body}, function(error, response, body) {

        var id = JSON.parse(body).item.id;
        var buyingBody = JSON.stringify({bought: true});

        request.put({url: url + id, headers: context.headers, body: buyingBody}, function() {

          request.get({url, headers: context.headers}, function(error, response, body) {
            var parsedBody = JSON.parse(body);

            expect(Array.isArray(parsedBody.bought)).toBeTruthy();
            expect(Array.isArray(parsedBody.pending)).toBeTruthy();
            expect(parsedBody.bought[0].description).toEqual('dragon blood');
            expect(parsedBody.pending[0].description).toEqual('valyrian steel');
            done();

          }); //closes get request
        }); //closes put request
      }); //closes second post request
    }); //closes first post request
  }); //closes 'should respond to a get request to /items'

  it('should respond to a get request with that item\'s information', function(done) {

    var context = this;

    var body = JSON.stringify({description: 'valyrian steel'});

    //seed with existing item first
    request.post({url, headers: context.headers, body}, function(error, response, body) {

      var parsedBody = JSON.parse(body);
      var itemId = parsedBody.item.id;

      request.get({url: url + itemId, headers: context.headers}, function(error, response, body) {

        var parsedBody = JSON.parse(body);
        expect(parsedBody.item.description).toEqual('valyrian steel');
        done();

      });

    });

  }); //closes 'should respond to a get request'

  it('should update an item and send back the properties that were changed', function(done) {

    var context = this;

    var body = JSON.stringify({description: 'valyrian steel'});

    //seed with existing item first
    request.post({url, headers: context.headers, body}, function(error, response, body) {

      var parsedBody = JSON.parse(body);
      var itemId = parsedBody.item.id;
      var updateBody = JSON.stringify({details: 'good for beheading, will need soon'});

      request.put({url: url + itemId, headers: context.headers, body: updateBody}, function(error, response, body) {

        var parsedBody = JSON.parse(body);

        expect(parsedBody.item.details).toEqual('good for beheading, will need soon');

        done();

      });

    });

  }); //closes 'should update a user'

  it('should delete an item and send back confirmation', function(done) {

    var context = this;

    var body = JSON.stringify({description: 'valyrian steel'});

    //seed with existing item first
    request.post({url, headers: context.headers, body}, function(error, response, body) {

      var parsedBody = JSON.parse(body);
      var itemId = parsedBody.item.id;

      request.del({url: url + itemId, headers: context.headers}, function(error, response, body) {

        var parsedBody = JSON.parse(body);
        expect(parsedBody.success).toEqual(true);
        expect(+parsedBody.deletedItemId).toEqual(1);

        done();

      });

    });

  }); //closes 'should delete an item'

}); //closes 'itemRouter'
