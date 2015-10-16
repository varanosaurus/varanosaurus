var router = require('express').Router();
var db = require('../db/interface.js');

var pathHandlers = {};

pathHandlers[''] = {
  post: function(request, response, next)
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