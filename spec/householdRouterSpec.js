process.env['NODE_ENV'] = 'testing';
var request = require('request');
var url = 'http://localhost:8080/api/households/';
var db = require('../server/db/interface');

//really-need lets us easily clear node's cache
//after each test so that we can have a clean
//server instance before the next text
var needRequire = require('really-need');

describe('householdRouter', function() {

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
          password: 'RplusLEqualsJ',
        });

        request.post({url: userUrl, headers: context.headers, body: userBody}, function(error, response, body) {
          var parsedBody = JSON.parse(body);

          context.headers['X-Access-Token'] = parsedBody.token;
          context.userId = JSON.parse(body).user.id;
          done();

          });

      }); //closes the then after syncing

  }); //closes beforeEach

  afterEach(function(done) {
    server.close(done);
  });

  it('should create a new household and send back the household', function(done) {

    var body = JSON.stringify({
      householdName: 'Winterfell',
      userId: this.userId,
    });

    var context = this;

    request.post({url, headers: context.headers, body}, function(error, response, body) {

      expect(JSON.parse(body).household.name).toEqual('Winterfell');
      done();
    });

  }); //closes create

  // xit('should respond to a get request', function(done) {

  //   var body = JSON.stringify({

  //   });

  //   request.post({url, headers: this.headers, body}, function(error, response, body) {

  //   });

  // }); //closes get

  // xit('should update', function(done) {

  //   var headers = {'content-type': 'application/json'};
  //   var body = JSON.stringify({

  //   });

  //   request.post({url, headers, body}, function(error, response, body) {

  //   });

  // }); //closes update

  // xit('should delete', function(done) {

  //   var headers = {'content-type': 'application/json'};
  //   var body = JSON.stringify({

  //   });

  //   request.post({url, headers, body}, function(error, response, body) {

  //   });

  // }); //closes delete

}); //closes householdRouter
