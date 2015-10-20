var router = require('express').Router();
var db = require('../db/interface.js');

router.post('/', function(request, response) {

  var householdId = request.decoded.householdId || request.body.householdId; //second part is for testing
  var userId = request.decoded.userId || request.body.userId; //second part is for testing
  var description = request.body.description;
  var details;
  if (request.body.details) {
    details = request.body.details;
  }

  db.Item.find({where: {householdId, description}})

    .then(function(item) {
      if (item) {
        //this household already has the same item, so reject
        response.status(409).send('Item already exists');
      } else {
        if (details) {
          return db.Item.create({description, details});
        } else {
          return db.Item.create({description});
        }
      }
    })

    .then(function(item) {
      item.setHousehold(householdId);
      item.setAddingUser(userId);
      response.status(201).json({
        success: true,
        description: item.description,
        //token here later
      });
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

router.get('/:itemId', function(request, response) {

  var id = request.body.itemId.slice(1); //slice out the colon

  db.Item.find({where: {id}})

    .then(function(item) {
      if (item) {
        console.log(item);
        response.status(201).json({
          description: item.description,
          details: item.details,
          fetch: item.fetch,
          bought: item.bought,
          price: item.price,
          timeFetched: item.timeFetched,
          timeBought: item.timeBought,
          addingUser: item.getAddingUser(),
          fetchingUser: item.fetchingUser(),
          buyingUser: item.buyingUser(),
        });
      } else {
        response.status(500).send('Item not found');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

router.put('/:itemId', function(request, response) {

  var id = request.body.itemId.slice(1); //slice out the colon
  var userId = request.decoded.userId;

  //we'll set the possible updates to an update object
  //then pass that into the update function
  var updates = {};
  var options = ['description', 'details', 'fetch', 'bought', 'price'];

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    if (request.body[option]) {
      updates[option] = request.body[option];
    }
  }

  //returning tells sequelize to pass the item that was updated
  //back to us as the second element of the returned array
  db.Item.update(updates, {where: {id}, returning: true})

    .then(function(updateArray) {
      if (updateArray) {
        var item = updateArray[1];

        if (request.body.fetch) {
          item.setFetchingUser(userId);
        }
        if (request.body.bought) {
          item.setBuyingUser(userId);
        }

        response.status(201).send(item);

      } else {
        response.status(500).send('Item not found');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

router.delete('/:itemId', function(request, response) {

  var id = request.body.itemId.slice(1); //slice out the colon

  db.Item.destroy({where: {id}})
    .then(function(numberDestroyed) {
      if (numberDestroyed) {
        response.status(201).send();
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
