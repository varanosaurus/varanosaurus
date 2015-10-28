process.env['NODE_ENV'] = 'testing';
process.env['TOKEN_SECRET'] = 'testing';

var request = require('request');
var url = 'http://localhost:8080/api/reckonings/';
var db = require('../../server/db/interface');

//urls we'll use when making requests in the beforeEach hook
var signupUrl = 'http://localhost:8080/auth/signup';
var userUrl = 'http://localhost:8080/api/users/';
var householdUrl = 'http://localhost:8080/api/households/';
var itemUrl = 'http://localhost:8080/api/items/';

//really-need lets us easily clear node's cache
//after each test so that we can have a clean
//server instance before the next text
var needRequire = require('really-need');

describe('itemRouter', function() {

  var server;

  beforeEach(function(done) {
    //restart the server for a clean slate
    server = needRequire('../../server/server', {bustCache: true, keep: false});

    var context = this;
    this.headers = {'content-type': 'application/json'};
    var jonToken;
    var jonId;
    var tyrionToken;
    // var tyrionId;

    //clear the db for a clean slate
    db.sequelize.sync({force: true})
      //now seed db with two users, one household, one, and one reckoning
      .then(function() {
        //add jonSnow as user1
        request.post({
          url: signupUrl,
          headers: context.headers,
          body: JSON.stringify({username: 'jonSnow', password: 'iKnowNothing'}),
        },
        function(error, response, body) {
          var parsedBody = JSON.parse(body);
          //save jon's info for later
          jonToken = parsedBody.token;
          jonId = parsedBody.user.id;

          //add tyrionLannister as user2
          request.post({
            url: signupUrl,
            headers: context.headers,
            body: JSON.stringify({username: 'tyrionLannister', password: 'godOfTitsAndWine'}),
          },
          function(error, response, body) {
            var parsedBody = JSON.parse(body);
            //save tyrion's info for later
            tyrionToken = parsedBody.token;
            // tyrionId = parsedBody.user.id;

            context.headers['X-Access-Token'] = tyrionToken;

            //add Westeros as household (should be under Tyrion as creator)
            request.post({
              url: householdUrl,
              headers: context.headers,
              body: JSON.stringify({name: 'Westeros'}),
            },
            function(error, response, body) {
              var parsedBody = JSON.parse(body);
              //now swap back to Jon's token and add him to the household
              context.headers['X-Access-Token'] = jonToken;
              context.householdId = parsedBody.household.id;

              request.put({
                url: userUrl + jonId,
                headers: context.headers,
                body: JSON.stringify({householdId: context.householdId}),
              },
              function(error, response, body) {
                var parsedBody = JSON.parse(body);
                //reset since his household is different now
                jonToken = parsedBody.token;
                context.headers['X-Access-Token'] = jonToken;

                //now we'll add an item to the household
                request.post({
                  url: itemUrl,
                  headers: context.headers,
                  body: JSON.stringify({description: 'dragon egg'}),
                }, function(error, response, body) {
                  var parsedBody = JSON.parse(body);
                  var itemId = parsedBody.item.id;

                  //and now we'll update the item saying that jon bought it
                  request.put({
                    url: itemUrl + itemId,
                    headers: context.headers,
                    body: JSON.stringify({buyingUserId: jonId, price: 100.00}),
                  },
                  function() {
                    done();
                  }); //closes put request to items/:itemId

                }); //closes post request to /items

              }); //closes put request to /users/:userId

            }); //closes post request to /households

          }); //closes post request to /users (for Tyrion)

        }); //closes post request to /users (for Jon)

      }); //closes then

  }); //closes beforeEach

  afterEach(function(done) {
    server.close(done);
  });

  it('should trigger a reckoning and return the reckoning information', function(done) {

    var context = this;
    request.post({url, headers: context.headers}, function(error, response, body) {
      var parsedBody = JSON.parse(body);

      expect(parsedBody.reckoning.totalSpent).toEqual('100.00');
      done();

    });

  });

  it('should respond to a get request to /reckonings with all the reckonings of the household', function(done) {
    var context = this;
    request.post({url, headers: context.headers}, function() {

      request.get({url, headers: context.headers}, function(error, response, body) {
        var parsedBody = JSON.parse(body);

        expect(Array.isArray(parsedBody.reckonings)).toBeTruthy();
        done();
      });

    });

  });

  it('should respond to a get request with that reckoning\'s information', function(done) {

    var context = this;
    request.post({url, headers: context.headers}, function(error, response, body) {
      var parsedBody = JSON.parse(body);
      var reckoningId = parsedBody.reckoning.id;

      request.get({url: url + reckoningId, headers: context.headers}, function(error, response, body) {
        var parsedBody = JSON.parse(body);

        expect(parsedBody.reckoning.id).toEqual(reckoningId);
        expect(parsedBody.reckoning.totalSpent).toEqual('100.00');

        done();

      });

    });

  });

}); //closes 'reckoningRouter'
