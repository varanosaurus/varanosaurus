process.env['NODE_ENV'] = 'testing';
var request = require('request');
var url = 'http://localhost:8080/api/users/';
var db = require('../server/db/interface');

//really-need lets us easily clear node's cache
//after each test so that we can have a clean
//server instance before the next text
var needRequire = require('really-need');

describe('userRouter', function() {

  var server;

  beforeEach(function(done) {

    var context = this;
    this.headers = {'content-type': 'application/json'};

    server = needRequire('../server/server', {bustCache: true, keep: false});
    db.sequelize.sync({force: true})
      .then(function() {

        //seed db with user
        var userUrl = 'http://localhost:8080/auth/signup';
        var userBody = JSON.stringify({
          accountName: 'nedStark',
          password: 'RPlusLEqualsJ',
        });

        request.post({url: userUrl, headers: context.headers, body: userBody}, function(error, response, body) {
          var parsedBody = JSON.parse(body);

          context.headers['X-Access-Token'] = parsedBody.token;
          context.userId = JSON.parse(body).user.id;
          done();

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

      expect(parsedBody.accountName).toEqual('nedStark');
      expect(parsedBody.displayName).toEqual(null);
      expect(parsedBody.id).toEqual(1);
      done();

    });

  }); //closes 'should respond to a get request'

  it('should update a user and send back the properties that were changed', function(done) {

    //seed database with new user
    var headers = {
      'content-type': 'application/json',
    };
    var body = JSON.stringify({
      accountName: 'amyleechiu',
      password: 'hypotrochoid',
    });

    request.post({url, headers, body}, function(error, response, body) {

      var id = JSON.parse(body).userId;
      var newUrl = url + id;

      var changes = JSON.stringify({
        displayName: 'alchiu',
      });

      request.put({url: newUrl, headers, body: changes}, function(error, response, body) {

        var parsedBody = JSON.parse(body);

        expect(parsedBody.displayName).toBeTruthy();
        expect(parsedBody.displayName).toEqual('alchiu');
        done();

      });

    });

  }); //closes 'should update a user'

  it('should delete a user and send back confirmation', function(done) {

    //seed database with new user
    var headers = {
      'content-type': 'application/json',
    };
    var body = JSON.stringify({
      accountName: 'kylecho',
      password: 'protip',
    });

    request.post({url, headers, body}, function(error, response, body) {

      var id = JSON.parse(body).userId;
      var newUrl = url + id;

      request.del({url: newUrl}, function(error, response, body) {

        var parsedBody = JSON.parse(body);

        expect(parsedBody.success).toEqual(true);
        //sequelize returns a string for id; cast to a number first
        expect(+parsedBody.deletedUserId).toEqual(id);
        done();

      });

    });

  }); //closes 'should delete a user'

}); //closes 'userRouter'
