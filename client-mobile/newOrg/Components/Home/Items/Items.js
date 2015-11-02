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
    return this.renderItemList();
  },

  renderItemList() {

    return (
      <ItemList
        itemsFilter={this.props.itemsFilter}
        items={this.props.items}
        gotoPendingItemsList={this.gotoPendingItemsList}
        gotoBoughtItemsList={this.gotoBoughtItemsList}
        gotoItemDetailsView={this.gotoItemDetailsView}
        gotoItemAddView={this.gotoItemAddView}
      />
    );
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

  gotoItemDetailsView(item) {
    this.props.dispatch(Actions.selectItem(item));

    if (this.props.itemsFilter === 'pending') {
      this.props.navigator.push(Routes.getPendingItemDetailsView(item, {
        updateItem: this.updateItem,
        gotoBoughtItemsList: this.gotoBoughtItemsList,
      }));
    } else {
      this.props.navigator.push(Routes.getBoughtItemDetailsView(item));
    }
  },

  gotoItemAddView() {
    console.log('pushing itemAddView');
    this.props.navigator.push(Routes.itemAddView);
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

  // var selectedItem;
  // var creator;
  // if (state.uiMode.selectedItemId) {
  //   for (var i = 0; i < items.length; i++) {
  //     if (items[i].id === state.uiMode.selectedItemId) {
  //       selectedItem = items[i];
  //       for (var j = 0; j < state.data.roommates.length; j++) {
  //         if (selectedItem.addingUserId === state.data.roommates[j].id) {
  //           creator = state.data.roommates[j];
  //         }
  //       }
  //     }
  //   }
  // }

  return {
    itemsViewMode: state.uiMode.itemsViewMode,
    itemsFilter: state.uiMode.itemsFilter,
    itemDetails: state.uiMode.itemDetails,
    selectedItemId: state.uiMode.selectedItemId,
    items,
  };
}

module.exports = connect(select)(Items);

