var {combineReducers} = require('redux');
var tokenReducer = require('./tokenReducer');
var uiModeReducer = require('./State/uiModeReducer');
var dataReducer = require('./Data/dataReducer');

module.exports = combineReducers({
  token: tokenReducer,
  uiMode: uiModeReducer,
  data: dataReducer,
});
