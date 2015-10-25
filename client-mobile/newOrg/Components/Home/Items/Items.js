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
        return <ItemAdd />;
      default:
        return <ItemList
          itemsFilter={this.props.itemsFilter}
          {...itemAddHandlers}
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
  };
}

var itemListHandlers = {
  goToPendingItemsList() {
    //TODO: ACTION - UPDATE uiMode.itemsFilter to pending
    //set items to pendingItems
  },
  goToBoughtItemsList() {
    //TODO: ACTION - UPDATE uiMode.itemsFilter to bought
    //set items to boughtItems
  },
  // goToItemDetailsView(item) {
  //   //TODO: ACTION - UPDATE uiMode.itemsViewMode to details
  // },
  goToAddItemView() {
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
