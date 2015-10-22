process.env['NODE_ENV'] = 'testing';
// var request = require('request');
// var inviteUrl = 'http://localhost:8080/api/invitations/';
// var authUrl = 'http://localhost:8080/auth';
var db = require('../../server/db/interface');

//really-need lets us easily clear node's cache
//after each test so that we can have a clean
//server instance before the next text
var needRequire = require('really-need');

describe('Invitation router', function() {

  var server;

  beforeEach(function(done) {
    var context = this;

    context.headers = {'content-type': 'application/json'};

    server = needRequire('../../server/server', {bustCache: true, keep: false});

    db.init()
      .catch(done.fail.bind(done))

      .then(function() {
        return db.User.bulkCreate(
          [
            {
              accountName: 'redstarter',
              password: 'broioioing',
            },
            {
              accountName: 'sylkal',
              password: '4dmathshapes',
            },
          ]
        );
      })

      .then(function() {
        return db.Household.create({name: 'Bro Palace'});
      })

      .then(function(household) {
        return db.User.findOne({where: {accountName: 'sylkal'}})
          .then(function(user) {
            household.addUser(user);
            user.setHousehold(household);
          });
      })

      .then(done);

  }); // beforeEach

  afterEach(function(done) {
    server.close(done);
  });






}); // 'Invitation router'
