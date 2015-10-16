var db = require('../db/interface.js');


var userFunctions = {}


userFunctions.add = function(request, response, next) {

  var username = request.body.username;
  var password = request.body.password;

  return db.User.find({where: {name: username}})
    .then(function(user) {
      if (user) {
        return 'User already exists';
      } else {
        return db.User.create({username: username, password: password});
      }
    })
    .catch(function(error) {
      console.error(error);
      return 'Error';
    });

};

module.exports = {
  user: userFunctions
};