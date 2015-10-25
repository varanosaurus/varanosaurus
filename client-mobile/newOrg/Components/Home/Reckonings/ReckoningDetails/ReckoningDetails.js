'use strict';

var React = require('react-native');

var ReckoningDetailList = require('./ReckoningDetailList/ReckoningDetailList');
var UserReckoningDetail = require('./dumb/UserReckoningDetail');

var ReckoningDetails = React.createClass({

  render() {
    switch (this.props.reckoningsDetailsMode) {
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
      <ReckoningDetailList
        /* TODO: pass prop? */
      />
    );
  },

  renderDetails() {
    return (
      <UserReckoningDetail
        /* TODO: pass prop? */
      />
    );
  }

});

function select(state) {
  return {
    reckoningDetailsMode: state.uiMode.reckoningsDetailsMode,
  };
}

module.exports = ReckoningDetails;
