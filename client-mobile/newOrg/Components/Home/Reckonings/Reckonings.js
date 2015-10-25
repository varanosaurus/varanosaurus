'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var ReckoningList = require('./dumb/ReckoningList');
var ReckoningDetails = require('./ReckoningDetail/ReckoningDetails');

var Reckoning = React.createClass({

  render() {
    switch (this.props.reckoningsViewMode) {
      case 'list':
        return this.renderList();
      case 'details':
        return this.renderDetails();
      default:
        return this.renderList();
    }
  },

  renderList() {
    return (
      <ReckoningList
        reckonings={this.props.reckonings}
        handleSelect={this.handleSelect}
      />
    );
  },

  renderDetails() {
    return (
      <ReckoningDetails
        reckoning={this.props.selectedReckoning}
      />
    );
  },

  handleSelect(/* reckoning */) {
    /* dispatching an action */
  },

});

function select(state) {
  return {
    reckoningsViewMode: state.uiMode.reckoningsViewMode,
    reckonings: state.data.reckonings,
    selectedReckoning: state.data.selectedReckoning,
  };
}

module.exports = connect(select)(Items);
