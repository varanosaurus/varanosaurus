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

  it('should create a new user and send back the userId', function(done) {

    var headers = {
      'content-type': 'application/json',
    };
    var body = JSON.stringify({
      accountName: 'naomi',
      password: 'hypotrochoid',
    });

    request.post({url: url + '/signup', headers, body}, function(error, response, body) {

      expect(body).toEqual(jasmine.any(String));

      var parsedBody = JSON.parse(body);

      expect(error).toBeFalsy();
      expect(response.statusCode).toEqual(201);
      expect(parsedBody.user.id).toBeTruthy();
      done();

    });

  }); //closes 'should create a new user'

});
