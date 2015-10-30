var {combineReducers} = require('redux');
var token = require('./tokenReducer');
var routes = require('./routesReducer');
var uiMode = require('./State/uiModeReducer');
var data = require('./Data/dataReducer');
// var initialState = require('./initialState');

function initialRoute(state = 'hometab') {
  return state;
}

module.exports = combineReducers({
  token,
  routes,
  initialRoute,
  uiMode,
  data,
});
