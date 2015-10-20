var router = require('express').Router();
var db = require('../db/interface.js');
var tokens = require('../services/tokens');

router.post('/', function(request, response) {

  //decoded is a property set by the token auth middleware
  //that makes the userId always available
  var userId = request.decoded.userId;

  var householdName = request.body.householdName;

  db.User.findById(userId)

    .then(function(user) {

      return user.getHousehold()

        .then(function(household) {
          //see if the user is already associated with a household
          //if so, reject the creation attempt
          if (household) {
            response.status(409).send('Household already exists');
          } else {
            return db.Household.create({name: householdName});
          }
        });
    })

    .then(function(household) {

      household.setCreator(userId);
      //set the creator as the default captain upon creation
      household.setCaptain(userId);
      response.status(201).json({
        household,
        token: tokens.issue(userId, household.id),
      });
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

router.get('/:householdId', function(request, response) {

  var id = request.decoded.householdId;

  db.Household.findById(id)

    .then(function(household) {
      if (household) {
        response.status(201).json(household);
      } else {
        response.status(500).send('Household not found');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });

});

//TODO: put: function(request, response) {},

router.delete('/:householdId', function(request, response) {

  var id = request.decoded.householdId;

  db.Item.destroy({where: {id}})
    .then(function(numberDestroyed) {
      if (numberDestroyed) {
        response.status(201).send();
      } else {
        response.status(500).send('Error deleting household');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

module.exports = router;
