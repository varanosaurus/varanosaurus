var db = require('../server/db/interface');

describe('Database interface', function() {

  it('should successfully initialize', function(done) {
    db.init().then(done)
      .catch(done.fail.bind(done));
  }, 10000);

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

    });

  }); // Closes 'User model'




}); // Closes 'Database interface'
