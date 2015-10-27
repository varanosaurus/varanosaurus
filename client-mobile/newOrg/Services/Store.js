'use strict';

var {createStore, applyMiddleware} = require('redux');
var thunk = require('redux-thunk');
var appReducer = require('../Reducers/appReducer');

var store = applyMiddleware(thunk)(createStore)(appReducer);

store.subscribe(function() {
  console.log('current state:');
  console.log(store.getState());
});

module.exports = store;
