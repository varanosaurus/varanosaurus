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

    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send(error);
    });

});

authRouter.post('/signup', function(request, response) {

  var accountName = request.body.accountName;
  var password = request.body.password;
  var displayName = request.body.displayName || null;

  return db.User.findOne({where: {accountName}})
    .then(function(user) {
      if (user) {
        response.status(409).send('User already exists');
      } else {
        return db.User.create({
          accountName,
          password,
          displayName,
        });
      }
    })
    .then(function(user) {
      response.status(201).json({
        user: {
          accountName: user.accountName,
          displayName: user.displayName,
          id: user.id,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
          household: user.household,
        },
        token: tokens.issue(user.id),
      });
    })
    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

module.exports = authRouter;
