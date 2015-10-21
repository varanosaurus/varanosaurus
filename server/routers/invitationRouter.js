var router = require('express').Router();

var db = require('../db/interface');

router.post(function(request, response) {

  var fromUserId = request.decoded.userId;
  var householdId = request.decoded.householdId;

  db.User.findOne({where: {accountName: request.body.toUsername}})

    .then(function(toUser) {
      if (!toUser) {
        return response.status(404).send('User does not exist');
      }

      return db.Invitation.create({toUserId: toUser.id, fromUserId, householdId})

        .then(function(invitation) {
          response.status(201).json(invitation);
        });

    })

    .catch(function(error) {
      response.status(500).send(error);
    });

});

router.get(function(request, response) {

  var userId = request.decoded.userId;

  db.Invitation.findAll({where: {toUserId: userId}})
    .then(function(invitations) {
      response.json(invitations);
    })
    .catch(function(error) {
      console.error(error);
      response.status(500).send(error);
    });

});

module.exports = router;
