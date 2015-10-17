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
        accountName: 'redstarter',
        password: 'brewbro',
        displayName: 'Sovester',
      })
      .then(function(user) {
        expect(user).toBeTruthy();
        expect(user).toEqual(jasmine.any(Object));
        expect(user.accountName).toEqual('redstarter');
      })
      .then(done)
      .catch(done.fail.bind(done));

    }); // Closes 'it should allow creation'

    it('should validate passwords before saving for length and content', function(done) {

      db.User.create({
        accountName: 'redstarter',
        password: 'bro',
        displayName: 'Sovester',
      })
      .then(function(user) {
        expect(user).toBeUndefined();
      })
      .catch(function(error) {
        expect(error).toBeTruthy();
        expect(error.name).toEqual('SequelizeValidationError');
      });

      db.User.create({
        accountName: 'redstarter',
        password: '^^asdlfkja',
        displayName: 'Sovester',
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

  }); // Closes 'User model'




}); // Closes 'Database interface'
