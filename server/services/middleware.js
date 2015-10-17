var tokens = require('./tokens');
var JsonWebTokenError = require('jsonwebtoken').JsonWebTokenError;
var TokenExpiredError = require('jsonwebtoken').TokenExpiredError;

// Middleware for verifying and decoding the request JWT
var verifyToken = function(req, res, next) {
  tokens.verify(req.headers['X-Access-Token'])
    .then(function(decoded) {
      req.decoded = decoded;
      next();
    })
    .catch(function(err) {
      if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
        res.status(403).send(err);
      } else {
        res.status(500).end();
      }
    });
};

module.exports = {
  verifyToken,
};
