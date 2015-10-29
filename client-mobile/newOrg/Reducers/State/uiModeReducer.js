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
  case 'ADD_HOUSEHOLD_SUCCESS':
    return 'settings';
  default:
    return state;
  }
}

function itemsViewMode(state = 'list', action) {
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

function selectedItemId(state = null, action) {
  switch (action.type) {
  case 'SELECT_ITEM':
    return action.payload.itemId;
  default:
    return state;
  }
}

function addItemRequestStatus(state = null, action) {
  switch (action.type) {
  case 'SET_ADD_ITEM_REQUEST_STATUS':
    return action.payload.status;
  default:
    return state;
  }
}

function addItemRequestError(state = null, action) {
  switch (action.type) {
  case 'ADD_ITEM_FAILURE':
    return action.payload.error;
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

function selectedReckoningId(state = null, action) {
  switch (action.type) {
  case 'SELECT_RECKONING':
    return action.payload.reckoningId;
  default:
    return state;
  }
}

function reckoningDetailsMode(state = 'items', action) {
  switch (action.type) {
  case 'SET_RECKONINGS_DETAILS_MODE':
    return action.payload.mode;
  default:
    return state;
  }
}

function reckoningDetailsItemsMode(state = 'list', action) {
  switch (action.type) {
  case 'SET_RECKONINGS_ITEMS_MODE':
    return action.payload.mode;
  default:
    return state;
  }
}

function reckoningSelectedItemId(state = null, action) {
  switch (action.type) {
  case 'SELECT_RECKONING_ITEM':
    return action.payload.itemId;
  default:
    return state;
  }
}

function settingsViewMode(state = 'options', action) {
  switch (action.type) {
  case 'SET_SETTINGS_VIEW_MODE':
    return action.payload.mode;
  case 'ADD_HOUSEHOLD_SUCCESS':
    return 'invite';
  default:
    return state;
  }
}

module.exports = combineReducers({
  entryMode,
  selectedHomeTab,
  itemsViewMode,
  itemsFilter,
  addItemRequestStatus,
  addItemRequestError,
  selectedItemId,
  reckoningsViewMode,
  selectedReckoningId,
  reckoningDetailsMode,
  reckoningDetailsItemsMode,
  reckoningSelectedItemId,
  settingsViewMode,
});
