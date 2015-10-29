var router = require('express').Router();

var db = require('../db/interface');
var tokens = require('../services/tokens');

router.post('/', function(request, response) {

  var fromUserId = request.decoded.userId;
  var householdId = request.decoded.householdId;

  if (!householdId) {
    return response.status(400).send('No household saved in token');
  }

  db.User.findOne({where: {username: request.body.toUsername}})

    .then(function(toUser) {
      if (!toUser) {
        return response.status(404).send('User does not exist');
      }

      db.Household.findOne({where: {id: householdId}})
        .then(function(household) {
          console.log('household: ', household);
          return db.Invitation.create({toUserId: toUser.id, fromUserId, householdId, householdName: household.name})

            .then(function(invitation) {
              console.log('invitation: ', invitation);
              response.status(201).json({invitation});
            });
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
      //also send back household id names
      response.json({invitations});
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
      response.json({invitations});
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send(error);
    });

});

router.put('/:invitationId', function(request, response) {
  var userId = request.decoded.userId;
  var householdId = request.decoded.householdId;
  var invitationId = request.params.invitationId;
  var status = request.body.status;

  db.Invitation.findOne({where: {id: invitationId}})

    .then(function() {

      if (status === 'accepted' || status === 'rejected') {
        db.Invitation.update(request.body, {where: {id: invitationId}, returning: true})
          .then(function(invitationArray) {
            if (status === 'accepted') {

              db.User.update({householdId}, {where: {id: userId}})
                .then(function() {

                  db.Household.findOne({where: {id: householdId}})
                    .then(function(household) {
                      response.status(200).json({
                        invitation: invitationArray[1][0],
                        household,
                        token: tokens.issue(userId, householdId),
                      });
                    });
                });

            } else {
              response.status(200).json({
                invitation: invitationArray[1][0],
              });
            }
          });

      } else {
        response.status(400).send('Bad request');
      }

    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send(error);
    });
});

router.route('/:invitationId')

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
