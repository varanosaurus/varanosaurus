var router = require('express').Router();
var db = require('../db/interface.js');

var pathHandlers = {};

pathHandlers[''] = {
  post: function(request, response, next) {
    return db.Household.find({where: {}})
      .then(function(user) {
        if (user) {
          response.status(409).send('Household already exists');
        } else {
          return db.Household.create({});
        }
      })
      .then(function(user) {
        response.status(201).json({
          success: true,
          //token here later
        });
      })
      .catch(function(error) {
        console.error(error);
        response.status(500).send();
      });
  }
};

pathHandlers[':householdID'] = {
  get: function(request, response, next),
  put: function(request, response, next),
  delete: function(request, response, next),
};

for (var path in pathHandlers) {
  for (var method in path) {
    router.route(path, /* verifyToken, */ method);
  }
}

module.exports = router;