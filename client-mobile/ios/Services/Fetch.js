'use strict';

var Store = require('./Store');

var testUrl = 'http://localhost:8080';
var deployUrl;

var url = deployUrl || testUrl;

var makeParams = function(method, token, body) {

  var params = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  if (token) {
    //attach the token if given
    params.headers['x-access-token'] = token;
  }

  return params;

};

var signup = function(username, password) {
  var params = makeParams('POST', null, {username, password});

  fetch(url + '/auth/signup', params)
    .then(function(response) {
      response.json()
        .then(function(body) {
          Store.token = body.token;
        });
    })
    .catch(function(error) {
      console.error(error);
    });
};

var login = function(username, password) {
  var params = makeParams('POST', null, {username, password});

  fetch(url + '/auth/login', params)
    .then(function(response) {
      response.json()
        .then(function(body) {
          Store.token = body.token;
        });
    })
    .catch(function(error) {
      console.error(error);
    });
};

//updates should be an object where the keys
//are the properties to be changed
//and the values are the new values
var updateUser = function(updates) {
  var params = makeParams('PUT', Store.token, updates);

  fetch(url + 'api/users/' + Store.user.id, params)
    .then(function(response) {
      if (updates.householdId) {
        //if the user's household was updated,
        //a new token will have been reissued,
        //so we need to store the new token
        response.json()
          .then(function(body) {
            Store.token = body.token;
          });
      }
    })
    .catch(function(error) {
      console.error(error);
    });
};

//getUser --> necessary? should be returned with login/signup/updateUser

var deleteUser = function() {
  var params = makeParams('DELETE', Store.token);

  fetch(url + 'api/users/' + Store.user.id, params)
    .then(function(response) {
      //not sure how we should deal with deletes, actually
      //probably won't be necessary to do for MVP
      //do we clear their id and everything from the Store and immediately sign them out?
      //for now, we'll just return the body
      return response.json();
    })
    .catch(function(error) {
      console.error(error);
    });
};

// var addHousehold = function(name) {
//   var params = makeParams('POST', Store.token, {name});

//   fetch(url + '/api/households/', params)
//     .then(function(response) {
//       response.json()
//         .then(function(body) {

//         })
//     })
// };


//getHousehold

//updateHousehold

//deleteHousehold

//addItem

//getItem

//getItemsinHousehold

//updateItem

module.exports = {
  signup,
  login,
  updateUser,
  deleteUser,
  // addHousehold,
};
