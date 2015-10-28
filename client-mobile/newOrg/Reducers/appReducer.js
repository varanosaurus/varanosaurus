var {combineReducers} = require('redux');
var token = require('./tokenReducer');
var routes = require('./routesReducer');
var uiMode = require('./State/uiModeReducer');
var data = require('./Data/dataReducer');

module.exports = combineReducers({
  token,
  routes,
  uiMode,
  data,
});
