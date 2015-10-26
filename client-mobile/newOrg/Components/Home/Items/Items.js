'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var ItemList = require('./dumb/ItemList');
var ItemDetails = require('./ItemDetails/ItemDetails');
var ItemAdd = require('./ItemAdd/ItemAdd');

var Items = React.createClass({

  render() {
    switch (this.props.itemsViewMode) {
      case 'list':
        return <ItemList
          itemsFilter={this.props.itemsFilter}
          items={this.props.items}
          pendingItems={this.props.pendingItems}
          {...itemListHandlers}
        />;
      case 'details':
        return <ItemDetails
          itemDetails={this.props.itemDetails}
          {...itemDetailsHandlers}
        />;
      case 'add':
        return <ItemAdd
          item={this.props.item}
          {...itemAddHandlers}
        />;
      default:
        return <ItemList
          itemsFilter={this.props.itemsFilter}
          {...itemListHandlers}
        />;
    }
  },

});


function select(state) {

  var items = (state.uiMode.itemsFilter === 'pending')
    ? state.data.pendingItems
    : state.data.boughtItems;

  return {
    itemsViewMode: state.uiMode.itemsViewMode,
    itemsFilter: state.uiMode.itemsFilter,
    itemDetails: state.uiMode.itemDetails,
    items,
    item: state.uiMode.selectedItem,
  };
}

var itemListHandlers = {
  gotoPendingItemsList() {
    //TODO: ACTION - UPDATE uiMode.itemsFilter to pending
    //set items to pendingItems
  },
  gotoBoughtItemsList() {
    //TODO: ACTION - UPDATE uiMode.itemsFilter to bought
    //set items to boughtItems
  },
  // goToItemDetailsView(item) {
  //   //TODO: ACTION - UPDATE uiMode.itemsViewMode to details
  // },
  gotoAddItemView() {
    //TODO: ACTION - UPDATE uiMode.itemsViewMode to add
  },
};

var itemDetailsHandlers = {
  //TODO
};

var itemAddHandlers = {
  //TODO
};

module.exports = connect(select)(Items);
