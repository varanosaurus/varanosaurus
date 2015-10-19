process.env['NODE_ENV'] = 'testing';
var request = require('request');
var url = 'http://localhost:8080/api';

//really-need lets us easily clear node's cache
//after each test so that we can have a clean
//server instance before the next text
var needRequire = require('really-need');

describe('userRouter', function() {

  var server;

  beforeEach(function() {
    server = needRequire('../server/server', {bustCache: true});
  });

  afterEach(function(done) {
    server.close(done);
  });

  it('should create a new user and send back response with the userId', function(done) {

    var headers = {
      'content-type': 'application/json',
    };
    var postUrl = url + '/users';
    var body = JSON.stringify({
      accountName: 'naomi',
      password: 'hypotrochoid',
    });

    request.post({headers, url: postUrl, body}, function(error, response, body) {

      var parsedBody = JSON.parse(body);

      expect(error).toBeFalsy();
      expect(response.statusCode).toEqual(201);
      expect(parsedBody.success).toEqual(true);
      expect(typeof(parsedBody.userId)).toEqual('number');
      done();
    });

  }); //closes 'should create a new user'

}); //closes 'userRouter'
