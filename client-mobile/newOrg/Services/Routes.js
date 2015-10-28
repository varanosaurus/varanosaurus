var store = require('./Store');
var Actions = require('../Actions/Actions');

function hometab() {

  console.log('rendering a hometab scene');

  var state = store.getState();

  var props = {
    selectedHomeTab: state.uiMode.selectedHomeTab,
    gotoItemsTab() {
      store.dispatch(Actions.setHomeTab('items'));
    },
    gotoReckoningsTab() {
      store.dispatch(Actions.setHomeTab('reckonings'));
    },
    gotoSettingsTab() {
      store.dispatch(Actions.setHomeTab('settings'));
    },
  };

  return {
    name: 'hometab',
    component: require('../Components/Home/dumb/HomeTab'),
    title: 'Home',
    props,
  };
}

module.exports = {
  hometab,
};
