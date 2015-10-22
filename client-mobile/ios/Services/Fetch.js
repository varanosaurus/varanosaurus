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
          Store.token.set(body.token);
          return response.json();
        });
    });
};

var login = function(username, password) {
  var params = makeParams('POST', null, {username, password});

  fetch(url + '/auth/login', params)
    .then(function(response) {
      return response.clone().json()
        .then(function(body) {
          Store.token.set(body.token);
          return response.json();
        });
    });
};

var updateUser = function(updates) {
  var params = makeParams('PUT', Store.token.get(), updates);

  fetch(url + 'api/users/' + Store.userId.get(), params)
    .then(function(response) {
      if (updates.householdId) {
        //if the user's household was updated,
        //a new token will have been reissued,
        //so we need to store the new token
        return response.clone().json()
          .then(function(body) {
            Store.token.set(body.token);
            return response.json();
          });
      } else {
        return response.json();
      }
    });
};

//getUser --> necessary? should be returned with login/signup/updateUser

var deleteUser = function() {
  var params = makeParams('DELETE', Store.token.get());

  fetch(url + 'api/users/' + Store.userId.get(), params)
    .then(function(response) {
      //not sure how we should deal with deletes, actually
      //probably won't be necessary to do for MVP
      //do we clear their id and everything from the Store and immediately sign them out?
      //for now, we'll just return the body
      return response.json();
    });
};

var addHousehold = function() {};


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
  addHousehold,
};
