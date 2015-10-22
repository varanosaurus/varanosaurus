'use strict';

//React-Native uses the fetch API, docs for which are found here: https://github.com/github/fetch
//However, React-Native did not include all of fetch's functionality it its own version of fetch
//(to find theirs, see react-native/Libraries/Fetch)
//This means some methods on the request object fetch returns don't exist
//So we're going to add one of them in here so that we can use it.
//In react-native/JavaScriptAppEngine/Initialization/InitializeJavaScriptAppEngine.js,
//The fetch Response class is set to the GLOBAL variable, which window is then set to
//We'll access it that way here and then add the clone function to the Response prototype

if (typeof GLOBAL === 'undefined') {
  GLOBAL = this;
}

if (typeof window === 'undefined') {
  window = GLOBAL;
}

GLOBAL.Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url,
  });
};

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
    //fetch returns a promise
    //response is an object that has methods to access headers
    //but also methods to access the body data
    //however, the body data comes in a stream which can only be read once
    //so if we want to read the data twice
    //we must clone the response
    .then(function(response) {
      return response.clone().json()
        .then(function(body) {
          console.log('body inside clone: ', body);
          Store.token.set(body.token);
          return response.json();
        });
    });
};

// var login = function(username, password) {
//   var params = makeParams('POST', null, {username, password});

//   fetch(url + '/auth/login', params)
//     //fetch returns a promise
//     //response is an object that has methods to access headers
//     //but also methods to access the body data
//     //however, the body data comes in a stream which can only be read once
//     //so if we want to read the data twice
//     //we must clone the response
//     .then(function(response) {
//       return response.clone().json()
//         .then(function(body) {
//           console.log('body inside clone: ', body);
//           Store.token.set(body.token);
//           return response.json();
//         });
//       //will return a promise with JSON passed in
//       // return response.json();
//     });
// };

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
};
