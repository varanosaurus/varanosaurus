var router = require('express').Router();
var db = require('../db/interface.js');

var pathHandlers = {};

pathHandlers[''] = {
  post: function(request, response) {

    var accountName = request.body.accountName;
    var password = request.body.password;

    return db.User.find({where: {accountName}})
      .then(function(user) {
        if (user) {
          response.status(409).send('User already exists');
        } else {
          return db.User.create({
            accountName,
            password,
          });
        }
      })
      .then(function() {
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

pathHandlers[':accountName'] = {
  // get: function(request, response) {

    // var accountName = request.body.accountName

  // },
  // put: function(request, response) {},
  // delete: function(request, response) {},
};

for (var path in pathHandlers) {
  for (var method in path) {
    router.route(path, /* verifyToken, */ method);
  }
}

module.exports = router;
