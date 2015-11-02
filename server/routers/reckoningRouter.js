var router = require('express').Router();
var db = require('../db/interface');
var reckon = require('../services/reckon');

router.get('/', function(request, response) {
  var householdId = request.decoded.householdId;
  if (!householdId) {
    response.status(400).send('No household saved on token');
  }

  db.Reckoning.findAll({where: {householdId}})

    .then(function(reckonings) {
      response.json({reckonings});
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send(error);
    });

});

//posts to reckonings are a bit different from the other models
//instead of taking user input and saving it to the db,
//we trigger a reckoning for the household
router.post('/', function(request, response) {
  var householdId = request.decoded.householdId;
  if (!householdId) {
    response.status(400).send('No household saved on token');
  }

  reckon(householdId)
    .then(function(reckoning) {
      db.Reckoning.findById(reckoning.id, {include: [{model: db.User, attributes: {exclude: ['password']}}, {model: db.Item}]})
        .then(function(reckoning) {
          response.status(201).json({reckoning});
        });
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });

});

router.get('/:reckoningId', function(request, response) {
  var householdId = request.decoded.householdId;
  var id = request.params.reckoningId;

  db.Reckoning.findById(id, {include: [
      {model: db.User, attributes: {include: ['id', 'username']}},
      {model: db.Item},
      {model: db.Payment},
    ]})

    .then(function(reckoning) {
      if (reckoning || reckoning.householdId === householdId) {
        response.status(201).json({reckoning});
      } else if (reckoning) {
        response.sendStatus(403);
      } else {
        response.status(500).send('Reckoning not found');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

module.exports = router;
