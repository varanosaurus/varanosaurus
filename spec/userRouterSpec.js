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

    server = needRequire('../server/server', {bustCache: true, keep: false});
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

    request.post({url, headers, body}, function(error, response, body) {

      var parsedBody = JSON.parse(body);

      expect(error).toBeFalsy();
      expect(response.statusCode).toEqual(201);
      expect(parsedBody.success).toEqual(true);
      expect(typeof(parsedBody.userId)).toEqual('number');
      done();
    });

  }); //closes 'should create a new user'

  it('should respond to a get request with that user\'s information', function(done) {

    var headers = {
      'content-type': 'application/json',
    };
    var body = JSON.stringify({
      accountName: 'naomi',
      password: 'hypotrochoid',
    });

    request.post({url, headers, body}, function(error, response, body) {

      var id = JSON.parse(body).userId;
      var newUrl = url + ':' + id;

      request.get({url: newUrl, headers}, function(error, response, body) {

        var parsedBody = JSON.parse(body);

        expect(parsedBody.accountName).toEqual('naomi');
        expect(parsedBody.displayName).toEqual(null);
        expect(typeof(parsedBody.userId)).toEqual('number');
        done();

      });

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
      var newUrl = url + ':' + id;

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
      var newUrl = url + ':' + id;

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
