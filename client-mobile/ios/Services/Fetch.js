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
    body: JSON.stringify(body),
  };

  if (token) {
    //attach the token if given
    params.headers['x-access-token'] = token;
  }

  return params;

};

var signup = function(username, password) {
  var params = makeParams('POST', null, {username, password});

  return fetch(url + '/auth/signup', params)
    .then(function(response) {
      return response.json();
    });
};

var login = function(username, password) {
  var params = makeParams('POST', null, {username, password});

  fetch(url + '/auth/login', params)
    //fetch returns a promise
    //response is an object that has methods to access headers
    //but also methods to access the body data
    //however, the body data comes in a stream which can only be read once
    //so if we want to read the data twice
    //we must clone the response
    .then(function(response) {
      return response.clone().json()
        .then(function(body) {
          console.log(body);
          Store.setToken(body.token);
          return response.json();
        });
      //will return a promise with JSON passed in
      // return response.json();
    });
};

// var updateUser = function(updates) {
//   var params = makeParams('PUT', savedToken, updates);

//   fetch(url + '/users/' + )
// };

//getUser --> necessary? should be returned with login/signup/updateUser

//deleteUser

//addHousehold

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
};
