var router = require('express').Router();
var db = require('../db/interface.js');

var pathHandlers = {};

pathHandlers[''] = {
  post: function(request, response) {

    //decoded is a property set by the token auth middleware
    //that makes the userId always available
    var userId = request.decoded.userId;
    var accountName = request.body.accountName;

    db.User.find({where: {id: userId}})

      .then(function() {

        db.User.getHousehold()
          .then(function(household) {
            //see if the user is already associated with a household
            //if so, reject the creation attempt
            if (household) {
              response.status(409).send('Household already exists');
            } else {
              return db.Household.create({accountName});
            }
          });
      })

      .then(function(household) {
        household.setCreator(userId);
        //set the creator as the captain as default upon creation
        household.setCaptain(userId);
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

pathHandlers[':householdID'] = {
  // get: function(request, response) {},
  // put: function(request, response) {},
  // delete: function(request, response) {},
};

for (var path in pathHandlers) {
  for (var method in path) {
    router.route(path, /* verifyToken, */ method);
  }
}

module.exports = router;
