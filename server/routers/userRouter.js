var router = require('express').Router();
var db = require('../db/interface.js');

var pathHandlers = {};

pathHandlers[''] = {
  post: function(request, response) {

    var accountName = request.body.accountName;
    var password = request.body.password;

    console.log(accountName, password);

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
      .then(function(user) {
        response.status(201).json({
          success: true,
          userId: user.id,
          //token here?[]
        });
      })
      .catch(function(error) {
        console.error(error);
        response.status(500).send();
      });
  },
};

pathHandlers[':accountName'] = {
  get: function(request, response) {

    var id = request.decoded.userId;

    db.User.find({where: {id}})

      .then(function(user) {
        if (user) {
          response.status(201).send(user); //format?
        } else {
          response.status(500).send('User not found');
        }
      })

      .catch(function(error) {
        console.error(error);
        response.status(500).send();
      });

  },

  // put: function(request, response) {
  // },

  delete: function(request, response) {

    var id = request.decoded.userId;

    db.User.destroy({where: {id}})
      .then(function(numberDestroyed) {
        if (numberDestroyed) {
          response.status(201).send();
        } else {
          response.status(500).send('Error deleting user');
        }
      })

      .catch(function(error) {
        console.error(error);
        response.status(500).send();
      });
  },
};

for (var path in pathHandlers) {
  for (var method in path) {
    router.route(path, /* verifyToken, */ method);
  }
}

module.exports = router;
