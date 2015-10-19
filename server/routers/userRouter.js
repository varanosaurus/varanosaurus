var router = require('express').Router();
var db = require('../db/interface.js');

router.post('/', function(request, response) {

  var accountName = request.body.accountName;
  var password = request.body.password;
  var displayName = request.body.displayName || null;

  return db.User.find({where: {accountName}})
    .then(function(user) {
      if (user) {
        response.status(409).send('User already exists');
      } else {
        return db.User.create({
          accountName,
          password,
          displayName,
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
});

router.get('/:userId', function(request, response) {

  // var id = request.decoded.userId;
  var id = request.params.userId.slice(1); //returns ':userId' not 'userId', so we have to splice the colon out

  db.User.find({where: {id}})

    .then(function(user) {
      if (user) {
        response.status(201).json({
          accountName: user.accountName,
          displayName: user.displayName,
          userId: user.id,
        });
      } else {
        response.status(500).send('User not found');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

router.put('/:userId', function(request, response) {

  var id = request.params.userId.slice(1); //returns ':userId' not 'userId', so we have to splice the colon out
  var updates = request.body;

  //returning tells sequelize to pass the model that was updated
  //back to us as the second element of the returned array
  db.User.update(updates, {where: {id}, returning: true})

    .then(function(updateArray) {
      if (updateArray) {

        response.status(201).json(updates);
      } else {
        response.status(500).send('Item not found');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });

});

router.delete('/:userId', function(request, response) {

  var id = request.params.userId.slice(1); //returns ':userId' not 'userId', so we have to splice the colon out

  db.User.destroy({where: {id}})
    .then(function(numberDestroyed) {
      if (numberDestroyed) {
        response.status(201).json({
          success: true,
          deletedUserId: id
        });
      } else {
        response.status(500).send('Error deleting user');
      }
    })

    .catch(function(error) {
      console.error(error);
      response.status(500).send();
    });
});

module.exports = router;
