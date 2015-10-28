'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../../Actions/Actions');

var ItemList = require('./dumb/ItemList');
var BoughtItemDetails = require('./dumb/BoughtItemDetails');
var PendingItemDetails = require('./dumb/PendingItemDetails');
// var ItemAdd = require('./ItemAdd/ItemAdd');

// var {
//   Text,
// } = React;

var Items = React.createClass({

  componentWillMount() {
    this.props.dispatch(Actions.fetchItemLists());
  },

  render() {
    switch (this.props.itemsViewMode) {
    case 'list':
      return this.renderItemList();
    case 'details':
      return this.renderItemDetails();
    }
  },

  renderItemList() {
    return <ItemList
      itemsFilter={this.props.itemsFilter}
      items={this.props.items}
      gotoPendingItemsList={this.gotoPendingItemsList}
      gotoBoughtItemsList={this.gotoBoughtItemsList}
      goToItemDetailsView={this.goToItemDetailsView}
    />;
  },

  renderItemDetails() {
    if (this.props.itemsFilter === 'pending') {
      return <PendingItemDetails
        item={this.props.selectedItem}
        creator={this.props.creator}
        updateItem={this.updateItem}
        gotoBoughtItemsList={this.gotoBoughtItemsList}
      />;
    } else {
      return <BoughtItemDetails
        item={this.props.selectedItem}
        creator={this.props.creator}
      />;
    }
  },

  gotoPendingItemsList() {
    this.props.dispatch(Actions.setItemsFilter('pending'));
    this.props.dispatch(Actions.setItemsViewMode('list'));
  },

  gotoBoughtItemsList() {
    this.props.dispatch(Actions.setItemsFilter('bought'));
    this.props.dispatch(Actions.setItemsViewMode('list'));
  },

  goToItemDetailsView(item) {
    this.props.dispatch(Actions.setItemsViewMode('details'));
    this.props.dispatch(Actions.selectItem(item));
  },

  updateItem(updates) {
    console.log('updating item in Items.js');
    this.props.dispatch(Actions.updateItem(updates));
  },

});


function select(state) {

  var items = (state.uiMode.itemsFilter === 'pending')
    ? state.data.items.pending
    : state.data.items.bought;

  var selectedItem;
  var creator;
  if (state.uiMode.selectedItemId) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === state.uiMode.selectedItemId) {
        selectedItem = items[i];
        for (var j = 0; j < state.data.roommates.length; j++) {
          if (selectedItem.addingUserId === state.data.roommates[j].id) {
            creator = state.data.roommates[j];
          }
        }
      }
    }
  }

  return {
    itemsViewMode: state.uiMode.itemsViewMode,
    itemsFilter: state.uiMode.itemsFilter,
    itemDetails: state.uiMode.itemDetails,
    selectedItemId: state.uiMode.selectedItemId,
    items,
    selectedItem,
    creator,
  };
}

// var itemListHandlers = {
//   gotoPendingItemsList() {
//     //TODO: ACTION - UPDATE uiMode.itemsFilter to pending
//     //set items to pendingItems
//   },
//   gotoBoughtItemsList() {
//     //TODO: ACTION - UPDATE uiMode.itemsFilter to bought
//     //set items to boughtItems
//   },
//   // goToItemDetailsView(item) {
//   //   //TODO: ACTION - UPDATE uiMode.itemsViewMode to details
//   // },
//   gotoAddItemView() {
//     //TODO: ACTION - UPDATE uiMode.itemsViewMode to add
//   },
// };

// var itemDetailsHandlers = {
//   //TODO
// };

// var itemAddHandlers = {
//   //TODO
// };

module.exports = connect(select)(Items);
