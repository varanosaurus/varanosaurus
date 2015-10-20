var tokens = require('./tokens');
var JsonWebTokenError = require('jsonwebtoken').JsonWebTokenError;
var TokenExpiredError = require('jsonwebtoken').TokenExpiredError;

// Middleware for verifying and decoding the request JWT
var verifyToken = function(request, response, next) {
  tokens.verify(request.headers['X-Access-Token'])
    .then(function(decoded) {
      request.decoded = decoded;
      next();
    })
    .catch(function(err) {
      if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
        response.status(403).send(err);
      } else {
        response.status(500).end();
      }
    });
};

module.exports = {
  verifyToken,
};
