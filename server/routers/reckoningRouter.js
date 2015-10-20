var router = require('express').Router();
var db = require('../db/interface.js');

//no posts yet, as reckonings happen automatically
//but will keep this here in case we add this later
// router.post('/', function(request, response) {});

router.get('/:reckoningId', function(request, response) {

  var id = request.params.reckoningId;

  db.Reckoning.findById(id)

    .then(function(reckoning) {
      if (reckoning) {
        response.status(201).json(reckoning);
      } else {
        response.status(500).send('Reckoning not found');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

router.put('/:reckoningId', function(request, response) {

  var id = request.params.reckoningId;
  var userId = request.decoded.userId;

  //we'll set the possible updates to an update object
  //then pass that into the update function
  var updates = request.body;

  //returning tells sequelize to pass the items that were updated
  //back to us as the second element of the returned array
  //even though here we're operating on one element,
  //it sends back an array in case we updated multiples at once
  db.Reckoning.update(updates, {where: {id}, returning: true})

    .then(function(updateArray) {
      var item;

      if (updateArray) {
        item = updateArray[1][0]; //gives us an array of one item

        if (request.body.fetch) {
          item.setFetchingUser(userId);
        }
        if (request.body.bought) {
          item.setBuyingUser(userId);
        }

        response.status(201).json(item); //todo: send back actual item

      } else {
        response.status(500).send('Item not found');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

router.delete('/:reckoningId', function(request, response) {

  var id = request.params.reckoningId;

  db.Reckoning.destroy({where: {id}})
    .then(function(numberDestroyed) {
      if (numberDestroyed) {
        response.status(201).json({
          success: true,
          deletedItemId: id,
        });
      } else {
        response.status(500).send('Error deleting item');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

module.exports = router;
