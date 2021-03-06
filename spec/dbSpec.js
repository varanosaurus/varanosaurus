process.env['NODE_ENV'] = 'testing';
var db = require('../server/db/interface');

describe('Database interface', function() {

  it('should successfully initialize', function(done) {
    db.init().then(done)
      .catch(done.fail.bind(done));
  }, 10000);

  beforeEach(function(done) {
    db.sequelize.sync({force: true})
      .then(done);
  });

  describe('User model', function() {

    it('should allow creation of a new user', function(done) {

      db.User.create({
        username: 'redstarter',
        password: 'brewbro',
      })
      .then(function(user) {
        expect(user).toBeTruthy();
        expect(user).toEqual(jasmine.any(Object));
        expect(user.username).toEqual('redstarter');
      })
      .catch(done.fail.bind(done))
      .then(done);

    }); // Closes 'it should allow creation'

    it('should validate account names before saving for length and content', function(done) {

      db.User.create({
        username: 'bro',
        password: 'brewbro',
      })
      .then(function(user) {
        expect(user).toBeUndefined();
      })
      .catch(function(error) {
        expect(error).toBeTruthy();
        expect(error.name).toEqual('SequelizeValidationError');
      })
      .then(done);

    }); // Closes 'it should validate account names'

    it('should validate passwords before saving for length and content', function(done) {

      db.User.create({
        username: 'redstarter',
        password: 'bro',
      })
      .then(function(user) {
        expect(user).toBeUndefined();
      })
      .catch(function(error) {
        expect(error).toBeTruthy();
        expect(error.name).toEqual('SequelizeValidationError');
      });

      db.User.create({
        username: 'redstarter',
        password: '^^asdlfkja',
      })
      .then(function(user) {
        expect(user).toBeUndefined();
      })
      .catch(function(error) {
        expect(error).toBeTruthy();
        expect(error.name).toEqual('SequelizeValidationError');
      });

      db.User.findAll()
        .then(function(users) {
          expect(users.length).toEqual(0);
          done();
        });

    }); // Closes 'it should validate passwords'

    it('should properly approve passwords with .comparePassword', function(done) {

      db.User.create({
        username: 'redstarter',
        password: 'beerbro',
      })
      .then(function(user) {
        expect(user).toBeTruthy();
        expect(user.name).not.toEqual('beerbro');
        return user.comparePassword('beerbro');
      })
      .then(function(match) {
        expect(match).toEqual(true);
      })
      .catch(done.fail.bind(done))
      .then(done);

    }); // Closes 'it should properly approve passwords'

    it('should properly reject incorrect passwords', function(done) {

      db.User.create({
        username:'redstarter',
        password: 'beerbro',
      })
      .then(function(user) {
        return user.comparePassword('love2surf');
      })
      .then(function(match) {
        expect(match).toEqual(false);
      })
      .catch(done.fail.bind(done))
      .then(done);

    }); // Closes 'it should properly reject incorrect passwords'

  }); // Closes 'User model'

  describe('Household model', function() {

    it('should allow creation of new households', function(done) {

      db.Household.create({
        name: '591 Dolores',
      })
      .then(function(household) {
        expect(household).toBeTruthy();
        expect(household.name).toEqual('591 Dolores');
      })
      .catch(done.fail.bind(done))
      .then(done);

    }); // Closes 'it should allow creation'

    it('should not allow names with characters other than letters, numbers, and spaces', function(done) {

      db.Household.create({
        name: '591-&&Dolores',
      })
      .then(function(household) {
        expect(household).toBeUndefined();
      })
      .catch(function(error) {
        expect(error).toBeTruthy();
        expect(error.name).toEqual('SequelizeValidationError');
      })
      .then(done);

    }); // Closes 'it should not allow names'

    it('should associate with many items', function(done) {

      db.Household.create({
        name: '591 Dolores',
      })
      .then(function(household) {
        return db.Item.bulkCreate([
            {
              description: 'TP',
              householdId: household.id,
            },
            {
              description: 'paper towels',
              householdId: household.id,
            },
            {
              description: 'hummus',
              householdId: household.id,
            },
          ])
          .then(function(items) {
            return items[0].getHousehold();
          })
          .then(function(foundHousehold) {
            expect(foundHousehold).toBeTruthy();
            expect(foundHousehold.name).toEqual('591 Dolores');
          });
      })
      .then(function() {
        return db.Household.findOne({where: {name: '591 Dolores'}});
      })
      .then(function(household) {
        return household.getItems();
      })
      .then(function(items) {
        expect(items).toBeTruthy();
        expect(items.length).toEqual(3);
      })
      .catch(done.fail.bind(done))
      .then(done);

    }); // Closes 'it should associate with many items'

  }); // Closes 'Household model'

  describe('Item model', function() {

    it('should allow creation of list items', function(done) {

      db.Item.create({
        description: 'Vampiric toilet paper',
      })
      .then(function(listItem) {
        expect(listItem).toBeTruthy();
        expect(listItem.description).toEqual('Vampiric toilet paper');
      })
      .catch(done.fail.bind(done))
      .then(done);

    }); // Closes 'it should allow creation'

    it('should associate with an addingUser', function(done) {

      db.User.create({
        username: 'redstarter',
        password: 'brewbro',
      })

      .then(function(user) {
        return db.Item.create({
          description: 'Pilsner',
        })
        .then(function(item) {
          return item.setAddingUser(user);
        });
      })

      .then(function() {
        return db.Item.findOne({where: {description: 'Pilsner'}})
        .then(function(item) {
          expect(item).toBeTruthy();
          expect(item.addingUserId).toBeTruthy();

          return item.getAddingUser()
            .then(function(user) {
              expect(user.username).toEqual('redstarter');
              return user;
            });
          });
      })

      .catch(done.fail.bind(done))
      .then(done);


    }); // Closes 'it should associate with an addingUser'

    it('should associate with a buyingUser', function(done) {

      db.User.create({
        username: 'redstarter',
        password: 'brewbro',
      })

       .then(function(user) {
        return db.Item.create({
          description: 'Pilsner',
        })
        .then(function(item) {
          return item.setBuyingUser(user);
        });
      })

      .then(function() {
       return db.Item.findOne({where: {description: 'Pilsner'}})
          .then(function(item) {
            expect(item.buyingUserId).toBeTruthy();
            return item.getBuyingUser();
          })
          .then(function(user) {
            expect(user).toBeTruthy();
            expect(user.username).toEqual('redstarter');
          });
      })

      .catch(done.fail.bind(done))
      .then(done);

    }); // Closes 'it should associate with a buyingUser'

  }); // Closes 'Item model'

  describe('User-reckoning many-to-many relationship', function() {

    beforeEach(function(done) {
      var self = this;

      db.User.bulkCreate([
        {
          username: 'redstarter',
          password: 'brewbro',
        },
        {
          username: 'cynthia',
          password: 'coffeefan',
        },
        {
          username: 'laura',
          password: 'guerrero',
        },
      ], {returning: true})

      .then(function(userModels) {
        self.users = userModels;
      })

      .catch(done.fail.bind(done))
      .then(done);

    }); // Closes 'beforeEach'

    it('should allow joins between a single user and many reckonings', function(done) {

      var users = this.users;

      db.Reckoning.create({totalSpent: 20.49})

        .then(function(reckoning) {
          return reckoning.addUser(users[0], {contribution: 5.20, debt: 0.0});
        })

        .then(function() {
          return db.Reckoning.create({totalSpent: 15.00});
        })

        .then(function(reckoning) {
          return reckoning.addUser(users[0], {contribution: 12.00, debt: -3.00});
        })

        .then(function() {
          return db.Reckoning.create({totalSpent: 500.00});
        })

        .then(function(reckoning) {
          return reckoning.addUser(users[0], {contribution: 2.00, debt: -300.00});
        })

        .then(function() {
          return users[0].getReckonings();
        })

        .then(function(reckonings) {
          expect(reckonings).toBeTruthy();
          expect(reckonings.length).toEqual(3);
        })

        .catch(done.fail.bind(done))
        .then(done);

    }); // Closes 'it should allow joins between a single user and many reckonings'

    it('should allow joins between a single reckoning and many users', function(done) {

      var users = this.users;

      db.Reckoning.create({totalSpent: 121.39})

        .then(function(reckoning) {
          return reckoning.setUsers(users)
            .then(function() {
              return reckoning;
            });
        })

        .then(function(reckoning) {
          return reckoning.getUsers()
            .then(function(joinedUsers) {
              expect(joinedUsers).toBeTruthy();
              expect(joinedUsers.length).toEqual(3);
            });
        })

        .catch(done.fail.bind(done))
        .then(done);

    }); // Closes 'should allow joins between a single reckoning and many users'

  }); // Closes 'User-reckoning many-to-many relationship'

}); // Closes 'Database interface'
