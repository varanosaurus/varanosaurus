var {combineReducers} = require('redux');

function entryMode(state = 'login', action) {
  switch (action.type) {
  case 'SET_ENTRY_MODE':
    return action.payload.mode;
  default:
    return state;
  }
}

function selectedHomeTab(state = 'items', action) {
  switch (action.type) {
  case 'SET_HOME_TAB':
    return action.payload.mode;
  default:
    return state;
  }
}

function itemsViewMode(state = 'details', action) {
  switch (action.type) {
  case 'SET_ITEMS_VIEW_MODE':
    return action.payload.mode;
  default:
    return state;
  }
}

function itemsFilter(state = 'pending', action) {
  switch (action.type) {
  case 'SET_ITEMS_FILTER':
    return action.payload.filter;
  default:
    return state;
  }
}

function reckoningsViewMode(state = 'list', action) {
  switch (action.type) {
  case 'SET_RECKONINGS_VIEW_MODE':
    return action.payload.mode;
  default:
    return state;
  }
}

module.exports = combineReducers({
  entryMode,
  selectedHomeTab,
  itemsViewMode,
  itemsFilter,
  reckoningsViewMode,
});
