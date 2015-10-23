process.env['NODE_ENV'] = 'testing';
var request = require('request');
var url = 'http://localhost:8080/auth';
var db = require('../../server/db/interface');

var needRequire = require('really-need');

describe('authRouter', function() {

  var server;

  beforeEach(function(done) {

    server = needRequire('../../server/server', {bustCache: true, keep: false});
    db.sequelize.sync({force: true}).then(done);

  });

  afterEach(function(done) {
    server.close(done);
  });

  it('should create a new user and send back the user and token', function(done) {

    var headers = {
      'content-type': 'application/json',
    };
    var body = JSON.stringify({
      username: 'naomi',
      password: 'hypotrochoid',
    });

    request.post({url: url + '/signup', headers, body}, function(error, response, body) {

      expect(body).toEqual(jasmine.any(String));

      var parsedBody = JSON.parse(body);

      expect(error).toBeFalsy();
      expect(response.statusCode).toEqual(201);
      expect(parsedBody.user.id).toBeTruthy();
      expect(parsedBody.token).toBeTruthy();
      done();

    });


  }); //closes 'should create a new user'

  it('should login an existing user and send back the user', function(done) {

    var headers = {
      'content-type': 'application/json',
    };
    var body = JSON.stringify({
      username: 'naomi',
      password: 'hypotrochoid',
    });

    request.post({url: url + '/signup', headers, body}, function() {

      var loginBody = JSON.stringify({
        username: 'naomi',
        password: 'hypotrochoid',
      });

      //send without token to simulate login
      request.post({url: url + '/login', headers, body: loginBody}, function(error, response, body) {

        var parsedBody = JSON.parse(body);

        expect(error).toBeFalsy();
        expect(parsedBody.user).toBeTruthy();
        expect(parsedBody.token).toBeTruthy();
        done();

      }); //closes login

    }); //closes signup

  }); //closes 'should login an existing user'

});
