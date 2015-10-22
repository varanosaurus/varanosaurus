var router = require('express').Router();

var db = require('../db/interface');

router.post('/', function(request, response) {

  var fromUserId = request.decoded.userId;
  var householdId = request.decoded.householdId;

  db.User.findOne({where: {username: request.body.toUsername}})

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

router.get('/inbox', function(request, response) {

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

router.get('/outbox', function(request, response) {
  var userId = request.decoded.userId;

  db.Invitation.findAll({Where: {fromUserId: userId}})

    .then(function(invitations) {
      response.json(invitations);
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send(error);
    });

});

router.route('/:invitationId')

  .put(function(request, response) {

    var updates = request.body;

    db.Invitation.update(updates, {where: {id: request.params.invitationId}})

      .then(function() {
        response.sendStatus(200);
      })

      .catch(function(error) {
        response.status(500).send(error);
      });

  })

  .delete(function(request, response) {

    db.Invitation.destroy({where: {id: request.params.invitationId}})

      .then(function() {
        response.sendStatus(200);
      })

      .catch(function(error) {
        response.status(500).send(error);
      });

  });

module.exports = router;
