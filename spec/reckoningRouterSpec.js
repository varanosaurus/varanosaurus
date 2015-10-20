// process.env['NODE_ENV'] = 'testing';
// var request = require('request');
// var url = 'http://localhost:8080/api/reckonings/';
// // var db = require('../server/db/interface');

// //really-need lets us easily clear node's cache
// //after each test so that we can have a clean
// //server instance before the next text
// var needRequire = require('really-need');

// describe('reckoningRouter', function() {

//   var server;

//   beforeEach(function() {

//     //theoretically clears the server before each test but doesn't work right now
//     server = needRequire('../server/server', {bustCache: true, keep: false});

//     //eventually figure out how to clear db before each test
//     //for now, tests are written to not conflict with each other
//     // db.sequelize.drop();
//     // db.sequelize.sync({force: true});
//   });

//   afterEach(function(done) {
//     server.close(done);
//   });

//   xit('should create', function(done) {

//     var headers = {'content-type': 'application/json'};

//     var body = JSON.stringify({

//     });

//     request.post({url, headers, body}, function(error, response, body) {

//     });

//   }); //closes create

//   xit('should respond to a get request', function(done) {

//     var headers = {'content-type': 'application/json'};

//     var body = JSON.stringify({

//     });

//     request.post({url, headers, body}, function(error, response, body) {

//     });

//   }); //closes get

//   xit('should update', function(done) {

//     var headers = {'content-type': 'application/json'};

//     var body = JSON.stringify({

//     });

//     request.post({url, headers, body}, function(error, response, body) {

//     });

//   }); //closes update

//   xit('should delete', function(done) {

//     var headers = {'content-type': 'application/json'};

//     var body = JSON.stringify({

//     });

//     request.post({url, headers, body}, function(error, response, body) {

//     });

//   }); //closes delete

// });
