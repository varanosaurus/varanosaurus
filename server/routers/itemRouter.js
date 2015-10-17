var router = require('express').Router();
var db = require('../db/interface.js');

var pathHandlers = {};

pathHandlers[''] = {
  post: function(request, response) {

    var householdId = request.decoded.householdId;
    var userId = request.decoded.userId;
    var description = request.body.description;

    db.Item.find({where: {householdId}})

      .then(function(item) {
        if (item) {
          //this household already has the same item, so reject
          response.status(409).send('Item already exists');
        } else {
          return db.Item.create({description});
        }
      })

      .then(function(item) {
        item.setAddingUser(userId);
        response.status(201).json({
          success: true,
          //token here later
        });
      })

      .catch(function(error) {
        console.error(error);
        response.status(500).send();
      });
  },
};

pathHandlers[':itemID'] = {
  // get: function(request, response, next),
  // put: function(request, response, next),
  // delete: function(request, response, next),
};

for (var path in pathHandlers) {
  for (var method in path) {
    router.route(path, /* verifyToken, */ method);
  }
}

module.exports = router;
