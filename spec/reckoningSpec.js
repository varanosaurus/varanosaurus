process.env['NODE_ENV'] = 'testing';

var db = require('../server/db/interface');
var reckon = require('../server/services/reckon');
var Promise = require('bluebird');

var testHousehold =
  {
    name: '591 Dolores',
  };

var testUsers =
  [
    {
      accountName: 'redstarter',
      password: 'brewbro',
      displayName: 'Sovester',
    },
    {
      accountName: 'cynthia',
      password: 'coffeefan',
      displayName: 'Cindy',
    },
    {
      accountName: 'laura',
      password: 'guerrero',
      displayName: 'Laura',
    },
  ];

var testItems =
  [
    {
      description: 'Thing 1',
      price: 5.00,
    },
    {
      description: 'Thing 2',
      price: 5.00,
    },
    {
      description: 'Thing 3',
      price: 5.00,
    },
    {
      description: 'Thing 4',
      price: 5.00,
    },
    {
      description: 'Thing 5',
      price: 5.00,
    },
    {
      description: 'Thing 6',
      price: 5.00,
    },
  ];

describe('Reckoning service', function() {

  // DB reset
  beforeEach(function(done) {

    db.sequelize.sync({force: true})

      .catch(done.fail.bind(done))
      .then(done);

  }); // Closes 'beforeEach: DB reset'

  // DB setup
  beforeEach(function(done) {

    var self = this;

    db.Household.create(testHousehold)

      .then(function(household) {
        self.household = household;

        return Promise.all(
            testUsers.map(function(user) {
              return household.createUser(user);
            })
          );

      })

      .then(function(users) {

        return Promise
          .all(db.Item.bulkCreate(testItems, {returning: true}))
          .then(function(items) {
            return self.household.setItems(items)
              .then(function() {
                return {users, items};
              });
          });

      })

      .then(function(results) {
        var users = results.users;
        var items = results.items;

        var promises = [];
        var i;

        for (i = 0; i < items.length; i++) {
          promises.push(items[i].setBuyingUser(users[i % users.length]));
        }

        return Promise.all(promises);

      })

      .then(function(res) {
        console.log(res);
      })


      .catch(done.fail.bind(done))
      .then(done);

  }); // Closes 'beforeEach: DB setup'

  xit('should create a total sum', function(done) {

    reckon(this.household.id)
      .then(function(reckoning) {
        console.log(reckoning);
        expect(reckoning).toBeTruthy();
        expect(reckoning.totalSpent).toEqual(30.00);
      })
      // .catch(done.fail.bind(done))
      .then(done);

  }); // Closes 'should create a total sum'

}); // Closes 'Reckoning service'
