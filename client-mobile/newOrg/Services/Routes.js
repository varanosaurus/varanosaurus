var store = require('./Store');

exports.hometab = {
    name: 'hometab',
    component: require('../Components/Home/dumb/HomeTab'),
    title: 'Home',
    props: {},
  };

var itemDetailsView = {
  name: 'itemDetailsView',
  component: require('../Components/Home/Items/dumb/ItemDetails'),
  title: 'Item Details',
};

exports.getItemDetailsView = function(item) {
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
    ...itemDetailsView,
    props,
  };
};
