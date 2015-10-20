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

  //declare these for closure access later on

  beforeEach(function(done) {

    var self = this;
    this.headers = {'content-type': 'application/json'};

    server = needRequire('../server/server', {bustCache: true, keep: false});
    db.sequelize.sync({force: true})
      .then(function() {

        var userUrl = 'http://localhost:8080/api/users/';
        var userBody = JSON.stringify({
          accountName: 'nedStark',
          password: 'RplusLEqualsJ',
        });

        request.post({url: userUrl, headers: this.headers, body: userBody}, function(error, response, body) {
          var parsedBody = JSON.parse(body);

          self.token = parsedBody.token;
          self.headers['X-Access-Token'] = parsedBody.token;
          self.userId = JSON.parse(body).userId;
          done();

          });

      }); //closes the then after syncing

  }); //closes beforeEach

  afterEach(function(done) {
    server.close(done);
  });

  it('should create a new household and send back the householdId', function(done) {

    var body = JSON.stringify({
      householdName: 'Winterfell',
      userId: this.userId,
    });

    request.post({url, headers: this.headers, body}, function(error, response, body) {
      expect(body).toBeTruthy();
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
