'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../../Actions/Actions');
var Routes = require('../../../Services/Routes');

var ItemList = require('./dumb/ItemList');
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

  // renderItemDetails() {
  //   if (this.props.itemsFilter === 'pending') {
  //     return <PendingItemDetails
  //       item={this.props.selectedItem}
  //       creator={this.props.creator}
  //       updateItem={this.updateItem}
  //       gotoBoughtItemsList={this.gotoBoughtItemsList}
  //     />;
  //   } else {
  //     return <BoughtItemDetails
  //       item={this.props.selectedItem}
  //       creator={this.props.creator}
  //     />;
  //   }
  // },

  gotoPendingItemsList() {
    this.props.dispatch(Actions.setItemsFilter('pending'));
    this.props.dispatch(Actions.setItemsViewMode('list'));
  },

  gotoBoughtItemsList() {
    this.props.navigator.popToTop();
    this.props.dispatch(Actions.setItemsFilter('bought'));
    this.props.dispatch(Actions.setItemsViewMode('list'));
  },

  goToItemDetailsView(item) {
    if (this.props.itemsFilter === 'pending') {
      this.props.navigator.push(Routes.getPendingItemDetailsView(item, {
        updateItem: this.updateItem,
        gotoBoughtItemsList: this.gotoBoughtItemsList,
      }));
    } else {
      this.props.navigator.push(Routes.getItemDetailsView(item));
    }
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

  return {
    itemsViewMode: state.uiMode.itemsViewMode,
    itemsFilter: state.uiMode.itemsFilter,
    itemDetails: state.uiMode.itemDetails,
    selectedItemId: state.uiMode.selectedItemId,
    items,
  };
}

module.exports = connect(select)(Items);
