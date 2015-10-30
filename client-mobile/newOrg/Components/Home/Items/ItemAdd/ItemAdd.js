'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../../../Actions/Actions');

var ItemAddView = require('./dumb/ItemAddView');

var ItemAdd = React.createClass({

  componentWillMount() {
    this.resetRequestStatus();
  },

  componentWillReceiveProps(nextProps) {

    var nextStatus = nextProps.addItemRequestStatus;

    if (nextStatus === 'succeeded') {
      this.props.navigator.pop();
    }
  },

  render() {
    return <ItemAddView
      handleSubmit={this.handleSubmit}
      status={this.props.addItemRequestStatus}
      error={this.props.addItemRequestError}
    />;
  },

  handleSubmit(item) {
    if (this.props.addItemRequestStatus === 'pending') {
      return;
    }

    this.props.dispatch(Actions.addItem(item));
    this.props.dispatch(Actions.setAddItemRequestStatus('pending'));
  },

  resetRequestStatus() {
    this.props.dispatch(Actions.setAddItemRequestStatus(null));
  },

});

function select(state) {
  return {
    addItemRequestStatus: state.uiMode.addItemRequestStatus,
    addItemRequestError: state.uiMode.addItemRequestError,
  };
}

module.exports = connect(select)(ItemAdd);
