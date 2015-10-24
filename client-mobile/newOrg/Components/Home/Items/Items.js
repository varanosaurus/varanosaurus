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
        return <ItemList />;
      case 'details':
        return <ItemDetails />;
      case 'add':
        return <ItemAdd />;
      default:
        return <ItemList />;
    }
  },

});


function select(state) {
  return {
    itemsViewMode: state.uiMode.itemsViewMode,
  };
}

module.exports = connect(select)(Items);
