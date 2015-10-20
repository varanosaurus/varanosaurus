var router = require('express').Router();
var db = require('../db/interface.js');

router.post('/', function(request, response) {

  //decoded is a property set by the token auth middleware
  //that makes the userId always available
  // var userId = request.decoded.userId;

  //comment this line out and uncomment out 8 when not testing
  var userId = request.body.userId;
  console.log('userId is: ', userId);
  var householdName = request.body.householdName;

  db.User.find({where: {id: userId}})

    .then(function(user) {

      user.getHousehold()
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
        success: true,
        householdName: household.name,
        householdId: household.id,
        //token here later
      });
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

router.get('/:householdId', function(request, response) {

  var id = request.body.householdId;

  db.Household.find({where: {id}})

    .then(function(household) {
      if (household) {
        response.status(201).send(household); //format?
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

  var id = request.body.householdId;

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
