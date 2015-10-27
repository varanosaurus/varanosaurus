'use strict';

var {createStore, applyMiddleware} = require('redux');
var thunk = require('redux-thunk');
var appReducer = require('../Reducers/appReducer');

module.exports = applyMiddleware(thunk)(createStore)(appReducer);
