var jwt = require('jsonwebtoken');
var secret = process.env.TOKEN_SECRET;

var issue = function(userId, householdId) {
  return jwt.sign({userId, householdId}, secret, {
    expiresIn: '7d',
  });
};

var verify = function(token) {
  return new Promise(function(fulfill, reject) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        reject(err);
      } else {
        fulfill(decoded);
      }
    });
  });
};

module.exports = {
  issue,
  verify,
};
