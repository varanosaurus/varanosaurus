'use strict';

var React = require('react-native');

var ItemList = require('./dumb/ReckoningItemList');
var ItemDetail = require('./dumb/ReckoningItemDetail');

var {connect} = require('react-redux');

var ReckoningItemsDetails = React.createClass({

  render() {
    console.log('this.props.mode in ReckoningItemsDetails is:', this.props.mode);
    return this.props.mode === 'list'
      ? this.renderItemList()
      : this.renderItemDetails();
  },

  renderItemList() {
    return <ItemList
      items={this.props.items}
      onSelect={this.handleSelect}
    />;
  },

  renderItemDetails() {
    var item;

    this.props.items.forEach(function(dataItem) {
      if (this.props.selectedItemId === dataItem.id) {
        item = dataItem;
      }
    });

    return <ItemDetail item={item} />;
  },

  handleSelect() {
    // TODO: dispatch action state.uiMode.reckoningsSelectedItem -> item.id
  },

});

function select(state) {
  return {
    mode: state.uiMode.reckoningDetailsItemsMode,
    selectedItemId: state.uiMode.reckoningsSelectedItem,
  };
}

module.exports = connect(select)(ReckoningItemsDetails);
