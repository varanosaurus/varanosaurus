var router = require('express').Router();
var db = require('../db/interface');
var reckon = require('../services/reckon');

//posts to reckonings are a bit different from the other models
//instead of taking user input and saving it to the db,
//we trigger a reckoning for the household
router.post('/', function(request, response) {
  var householdId = request.decoded.householdId;

  reckon(householdId)
    .then(function(reckoning) {
    response.status(201).json(reckoning);
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });

});

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

module.exports = router;
