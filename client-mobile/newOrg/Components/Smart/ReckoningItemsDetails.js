'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var ItemList = require('../Dumb/ReckoningItemList');
var ItemDetail = require('../Dumb/ReckoningItemDetail');

var ReckoningItemsDetails = React.createClass({

  render() {
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
