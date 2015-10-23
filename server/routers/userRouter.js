var router = require('express').Router();
var db = require('../db/interface.js');
var tokens = require('../services/tokens');

//If you're looking for where new users are created,
//go to the authRouter - the creation code lives there
//so that posts to create new users don't need tokens.

router.get('/:userId', function(request, response) {
  var id = request.decoded.userId;
  db.User.findById(id, {attributes: {exclude: ['password']}})

    .then(function(user) {
      if (user) {
        response.status(201).json({user});
      } else {
        response.status(500).send('User not found');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

//TODO: allow household to be added/changed (reissue token)
router.put('/:userId', function(request, response) {

  var id = request.decoded.userId;
  var updates = request.body;

  //returning tells sequelize to pass the model that was updated
  //back to us as the second element of the returned array
  db.User.update(updates, {where: {id}, returning: true})

    .then(function(updateArray) {
      var token;

      if (updateArray) {
        if (updates.householdId) {
          token = tokens.issue(id, updates.householdId);
        } else {
          token = tokens.issue(id);
        }

        response.status(201).json({user: updateArray[1][0], token});

      } else {
        response.status(500).send('Item not found');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });

});

router.delete('/:userId', function(request, response) {

  var id = request.decoded.userId;

  db.User.destroy({where: {id}})
    .then(function(numberDestroyed) {
      if (numberDestroyed) {
        response.status(201).json({
          success: true,
          deletedUserId: id,
        });
      } else {
        response.status(500).send('Error deleting user');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

module.exports = router;
