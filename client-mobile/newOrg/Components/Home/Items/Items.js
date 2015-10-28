'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../../Actions/Actions');
var Routes = require('../../../Services/Routes');

var ItemList = require('./dumb/ItemList');
var ItemDetails = require('./dumb/ItemDetails');
// var ItemAdd = require('./ItemAdd/ItemAdd');

// var {
//   Text,
// } = React;

var Items = React.createClass({

  componentWillMount() {
    this.props.dispatch(Actions.fetchItemLists());
  },

  render() {
    // switch (this.props.itemsViewMode) {
    // case 'list':
    //   return this.renderItemList();
    // case 'details':
    //   return this.renderItemDetails();
    // }
    console.log('rendering items view, see props below');
    console.dir(this.props);
    return this.renderItemList();
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
    return <ItemDetails
      item={this.props.selectedItem}
      creator={this.props.creator}
    />;
  },

  gotoPendingItemsList() {
    this.props.dispatch(Actions.setItemsFilter('pending'));
  },

  gotoBoughtItemsList() {
    this.props.dispatch(Actions.setItemsFilter('bought'));
  },

  goToItemDetailsView(item) {
    // this.props.dispatch(Actions.selectItem(item));
    this.props.navigator.push(Routes.getItemDetailsView(item));
  },

});


function select(state) {

  var items = (state.uiMode.itemsFilter === 'pending')
    ? state.data.items.pending
    : state.data.items.bought;


  return {
    itemsViewMode: state.uiMode.itemsViewMode,
    itemsFilter: state.uiMode.itemsFilter,
    itemDetails: state.uiMode.itemDetails,
    selectedItemId: state.uiMode.selectedItemId,
    items,
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
