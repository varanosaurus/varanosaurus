var store = require('./Store');

exports.hometab = {
    name: 'hometab',
    component: require('../Components/Home/dumb/HomeTab'),
    title: 'Home',
    props: {},
  };


var getBoughtItemDetailsView = exports.getItemDetailsView = function(item) {
  var state = store.getState();
  var roommates = state.data.roommates;

  var creator;

  var i;


  for (i = 0; i < roommates.length; i++) {
    if (item.addingUserId == roommates[i].id) {
      creator = roommates[i];
    }
  }


  var props = {
    item,
    creator,
  };

  return {
    name: 'boughtItemDetailsView',
    component: require('../Components/Home/Items/dumb/BoughtItemDetails'),
    title: item.description,
    props,
  };


};

exports.getPendingItemDetailsView = function(item, props) {
  var scene = getBoughtItemDetailsView(item);
  scene.name = 'pendingItemDetailsView';
  scene.component = require('../Components/Home/Items/dumb/PendingItemDetails');

  props = {
    ...scene.props,
    ...props,
  };

  return {
    ...scene,
    props,
  };
};
