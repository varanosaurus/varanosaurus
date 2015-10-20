process.env['TOKEN_SECRET'] = 'banaynays';
var tokens = require('../../server/services/tokens');
var jwt = require('jsonwebtoken');

var JsonWebTokenError = jwt.JsonWebTokenError;
var TokenExpiredError = jwt.TokenExpiredError;

describe('Tokens service', function() {

  it('should issue tokens with userId and householdId', function() {

    var token = tokens.issue(1, 2);

    expect(token).toBeTruthy();
    expect(token).toEqual(jasmine.any(String));

  }); // Closes 'should issue tokens with userId and householdId'

  it('should verify tokens and fulfill promises with their data', function(done) {

    var token = tokens.issue(1, 2);

    tokens.verify(token)

      .then(function(data) {
        expect(data).toBeTruthy();
        expect(data.userId).toBeTruthy();
        expect(data.userId).toEqual(1);
        expect(data.householdId).toBeTruthy();
        expect(data.householdId).toEqual(2);
      })

      .catch(done.fail.bind(done))
      .then(done);

  }); // Closes 'should verify tokens and fulfill promises with their data'

  it('should reject tokens with incorrect encoding', function(done) {

    var badToken = jwt.sign({}, 'wrong secret');

    tokens.verify(badToken)
      .then(function(data) {
        expect(data).toBeUndefined();
      })
      .catch(function(err) {
        expect(err).toEqual(jasmine.any(JsonWebTokenError));
      })

      .catch(done.fail.bind(done))
      .then(done);

  }); // Closes 'should reject tokens with incorrect encoding'

  it('should reject tokens that were issued more than a week ago', function(done) {
    var token;

    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2012, 11, 23));

    token = tokens.issue(1, 2);

    jasmine.clock().mockDate(new Date(2012, 11, 31));

    tokens.verify(token)

      .then(function(data) {
        expect(data).toBeUndefined();
      })

      .catch(function(err) {
        expect(err).toEqual(jasmine.any(TokenExpiredError));
      })

      .then(function() {
        jasmine.clock().uninstall();
      })

      .catch(done.fail.bind(done))
      .then(done);

  }); // Closes 'should reject tokens that were issued more than a week ago'

}); // Closes 'Tokens service'
