var authRouter = require('express').Router();
var db = require('./db/interface');
var tokens = require('../services/tokens');

authRouter.post('/login', function(req, res) {
  db.User.findOne({where: {name: req.body.name}})
    .then(function(user) {

      var token;

      if (!user) {
       return res.status(404).end('User doesn\'t exist.');
      }

      if (user.comparePassword(req.body.password)) {
        // TODO: see if this way of checking for a set household actually works, or throws an error
        token = tokens.issue(user.id, user.getHousehold() ? user.getHousehold().id : undefined);
        return res.status(200).json(token);
      } else {
        return res.status(403).end('Wrong password.');
      }

    });
});

module.exports = authRouter;
