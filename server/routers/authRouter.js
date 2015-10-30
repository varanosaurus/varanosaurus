var authRouter = require('express').Router();
var db = require('../db/interface');
var tokens = require('../services/tokens');

authRouter.post('/login', function(request, response) {

  db.User.findOne({where: {username: request.body.username}})
    .then(function(user) {

      var token;

      if (!user) {
       return response.status(404).send({error: 'User doesn\'t exist.'});
      }

      var userData = {username: user.username, id: user.id, householdId: user.householdId};

      if (user.comparePassword(request.body.password)) {
        // TODO: see if this way of checking for a set household actually works, or throws an error
        // token = tokens.issue(user.id, user.getHousehold() ? user.getHousehold().id : undefined);
        if (user.householdId !== null) {
          token = tokens.issue(user.id, user.householdId);
          db.Household.findOne({where: {id: user.householdId}})
            .then(function(household) {
              db.User.findAll({where: {householdId: household.id}, attributes: ['username', 'id']})
                .then(function(roommates) {
                  return response.status(200).json({
                    userData,
                    token,
                    household,
                    roommates,
                  });
                });
            });
        } else {
          token = tokens.issue(user.id);
          db.Invitation.findAll({where: {toUserId: user.id, status: 'pending'}})
            .then(function(invitations) {
              return response.status(200).json({userData, token, invitations});
            });
        }
      } else {
        return response.status(403).send({error: 'Wrong password.'});
      }

    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send(error);
    });

});

authRouter.post('/signup', function(request, response) {

  var username = request.body.username;
  var password = request.body.password;

  return db.User.findOne({where: {username}})
    .then(function(user) {
      if (user) {
        response.status(409).send({error: 'User already exists'});
      } else {
        return db.User.create({
          username,
          password,
        });
      }
    })
    .then(function(user) {
      response.status(201).json({
        user: {
          username: user.username,
          id: user.id,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
          householdId: user.householdId,
        },
        token: tokens.issue(user.id),
      });
    })
    .catch(function(error) {
      console.error(error);
      response.status(500).send({error: 'Error signing up user'});
    });
});

module.exports = authRouter;
