var router = require('express').Router();
var db = require('../db/interface.js');

router.get('/', function(request, response) {
  var householdId = request.decoded.householdId;
  if (!householdId) {
    response.status(400).send({error: 'No household saved in token'});
  }

  db.Item.findAll({where: {householdId, bought: false, reckoningId: null}})
    .then(function(pending) {
      if (!pending) {
        response.status(500).send({error: 'Error finding pending items'});
      }

      db.Item.findAll({where: {householdId, bought: true, reckoningId: null}})
        .then(function(bought) {
          if (!bought) {
            response.status(500).send({error: 'Error finding bought items'});
          }
          response.status(200).json({bought, pending});
        });
    })

    .catch(function(error) {
      response.status(500).send({error});
    });

});

router.post('/', function(request, response) {

  var householdId = request.decoded.householdId;
  var userId = request.decoded.userId;
  var description = request.body.description;
  var requestItem = request.body;

  db.Item.find({where: {householdId, description}})

    .then(function(item) {
      if (item) {
        //this household already has the same item, so reject
        response.status(409).send({error: 'Item already exists'});
      } else {
        if (requestItem.bought) {
          requestItem.buyingUserId = userId;
        }
        return db.Item.create(requestItem);
      }
    })

    .then(function(item) {
      item.setHousehold(householdId);
      item.setAddingUser(userId);
      response.status(201).json({item});
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send({error});
    });
});

router.get('/:itemId', function(request, response) {

  var id = request.params.itemId;

  db.Item.findById(id)

    .then(function(item) {
      if (item) {
        response.status(200).json({item});
      } else {
        response.status(500).send({error: 'Item not found'});
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send({error});
    });
});

router.put('/:itemId', function(request, response) {

  var id = request.params.itemId;
  var userId = request.decoded.userId;
  var householdId = request.decoded.householdId;

  //we'll set the possible updates to an update object
  //then pass that into the update function
  var updates = request.body;

  //returning tells sequelize to pass the items that were updated
  //back to us as the second element of the returned array.
  db.Item.update(updates, {where: {id}, returning: true})

    .then(function(updateArray) {
      var item;

      if (updateArray) {
        //Even though we're only operating on one element,
        //Sequelize sends back an array in case we updated multiples at once
        //So the first access gets us the array of models updated
        //And the second access gets us the specific model we want
        item = updateArray[1][0];

        if (request.body.fetch) {
          item.setFetchingUser(userId);
        }
        if (request.body.bought) {
          item.setBuyingUser(userId);
        }

        return db.Item.findAll({where: {householdId, bought: false, reckoningId: null}})
          .then(function(pending) {
            if (!pending) {
              return response.status(500).send({error: 'Error finding pending items'});
            }

            db.Item.findAll({where: {householdId, bought: true, reckoningId: null}})
              .then(function(bought) {
                if (!bought) {
                  return response.status(500).send({error: 'Error finding bought items'});
                }
                return response.status(201).json({bought, pending});
              });
          });

      } else {
        return response.status(500).send({error: 'Item not found'});
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send({error});
    });
});

router.delete('/:itemId', function(request, response) {

  var id = request.params.itemId;

  db.Item.destroy({where: {id}})
    .then(function(numberDestroyed) {
      if (numberDestroyed) {
        response.status(201).json({
          success: true,
          deletedItemId: id,
        });
      } else {
        response.status(500).send({error: 'Error deleting item'});
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send({error});
    });
});

module.exports = router;
