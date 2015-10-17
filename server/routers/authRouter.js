var authRouter = require('express').Router();
var db = require('../db/interface');
var tokens = require('../services/tokens');

authRouter.post('/login', function(request, response) {
  db.User.findOne({where: {accountName: request.body.accountName}})
    .then(function(user) {

      var token;

      if (!user) {
       return response.status(404).send('User doesn\'t exist.');
      }

      if (user.comparePassword(request.body.password)) {
        // TODO: see if this way of checking for a set household actually works, or throws an error
        token = tokens.issue(user.id, user.getHousehold() ? user.getHousehold().id : undefined);
        return response.status(200).json(token);
      } else {
        return response.status(403).send('Wrong password.');
      }

    });
});

module.exports = authRouter;
