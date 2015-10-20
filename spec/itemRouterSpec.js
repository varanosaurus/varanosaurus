// process.env['NODE_ENV'] = 'testing';
// var request = require('request');
// var url = 'http://localhost:8080/api/items/';
// var db = require('../server/db/interface');

// //really-need lets us easily clear node's cache
// //after each test so that we can have a clean
// //server instance before the next text
// var needRequire = require('really-need');

// xdescribe('itemRouter', function() {

//   var server;

//   //declare these for closure access later on
//   var householdId;
//   var userId;
//   var headers = {'content-type': 'application/json'};

//   beforeEach(function(done) {

//     server = needRequire('../server/server', {bustCache: true, keep: false});
//     db.sequelize.sync({force: true})
//       .then(function() {

//         var userUrl = 'http://localhost:8080/api/users/';
//         var userBody = JSON.stringify({
//           accountName: 'nedStark',
//           password: 'RplusLEqualsJ',
//         });

//         request.post({url: userUrl, headers, body: userBody}, function(error, response, body) {

//           userId = JSON.parse(body).userId;
//           var headers = {'content-type': 'application/json'};
//           var householdUrl = 'http://localhost:8080/api/households/';
//           var householdBody = JSON.stringify({
//             householdName: 'winterfell',
//             userId,
//           });

//           request.post({url: householdUrl, headers, body: householdBody}, function(error, response, body) {

//             householdId = JSON.parse(body).householdId;

//             done();

//           });

//         });

//       });
//   });

//   afterEach(function(done) {
//     server.close(done);
//   });

//   xit('should create a new item and send back the itemId', function(done) {

//     var body = JSON.stringify({
//       description: 'valyrian steel',
//       householdId,
//       userId,
//     });

//     request.post({url, headers, body}, function(error, response, body) {
//       expect(body).toBeTruthy();
//     });

//   }); //closes create

//   xit('should respond to a get request', function(done) {

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

// }); //closes itemRouter
