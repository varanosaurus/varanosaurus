'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../../Actions/Actions');

var JoinOrCreateHousehold = require('./dumb/JoinOrCreateHousehold');

var Homeless = React.createClass({

  render() {
    return <JoinOrCreateHousehold
          invitations={this.props.invitations}
          join={this.handleJoinHousehold}
          reject={this.handleRejectHousehold}
          submit={this.handleHouseholdCreation}
        />;
  },

  handleJoinHousehold(data) {
    console.log(data);
    //dispatch action to store causing update of joined household (user belongs to household --> go to homeTab)
    // this.props.dispatch(Actions.joinHousehold('accepted', data.id));
  },

  handleRejectHousehold(/*data*/) {
    //dispatch action to store causing removal of household invitation (updates invitation list in invitations UI)
    // this.props.dispatch(Actions.rejectHousehold('rejected'));
  },

  handleHouseholdCreation(data) {
    // dispatch action to store causing creation of new household
    this.props.dispatch(Actions.addHousehold(data));
  },

});

function select(state) {
  return {
    invitations: state.data.invitations,
    house: state.data.user.householdId,
  };
}

module.exports = connect(select)(Homeless);

