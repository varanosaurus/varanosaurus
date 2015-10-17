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
        done();
      })
      .catch(done.fail.bind(done));

    }); // Closes 'it should allow creation'

    it('should validate account names before saving for length and content', function(done) {

      db.User.create({
        accountName: 'bro',
        password: 'brewbro',
        displayName: 'Sovester',
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

    it('shouldn\'t allow an empty displayName', function(done) {

      db.User.create({
        accountName: 'redstarter',
        password: 'beerbro',
        displayName: '',
      })
      .then(function(user) {
        expect(user).toBeUndefined();
      })
      .catch(function(error) {
        expect(error).toBeTruthy();
        expect(error.name).toEqual('SequelizeValidationError');
      })
      .then(done);

    }); // Closes 'it shouldn't allow an empty displayName'

    it('should properly approve passwords with .comparePassword', function(done) {

      db.User.create({
        accountName: 'redstarter',
        password: 'beerbro',
        displayName: 'Sovester',
      })
      .then(function(user) {
        expect(user).toBeTruthy();
        expect(user.name).not.toEqual('beerbro');
        return user.comparePassword('beerbro');
      })
      .then(function(match) {
        expect(match).toEqual(true);
        done();
      })
      .catch(done.fail.bind(done));

    }); // Closes 'it should properly approve passwords'

    it('should properly reject incorrect passwords', function(done) {

      db.User.create({
        accountName:'redstarter',
        password: 'beerbro',
        displayName: 'Sovester',
      })
      .then(function(user) {
        return user.comparePassword('love2surf');
      })
      .then(function(match) {
        expect(match).toEqual(false);
        done();
      })
      .catch(done.fail.bind(done));

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
        done();
      })
      .catch(done.fail.bind(done));

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

  }); // Closes 'Household model'

  describe('Item model', function() {

    it('should allow creation of list items', function(done) {

      db.Item.create({
        description: 'Vampiric toilet paper',
        addingUserId: '1',
      })
      .then(function(listItem) {
        expect(listItem).toBeTruthy();
        expect(listItem.description).toEqual('Vampiric toilet paper');
        done();
      })
      .catch(done.fail.bind(done));

    }); // Closes 'it should allow creation'

  }); // Closes 'Item model'

}); // Closes 'Database interface'
