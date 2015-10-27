'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var CreateHousehold = require('./dumb/CreateHousehold');
var Invitations = require('./dumb/Invitations');
var InviteRoommates = require('./dumb/InviteRoommates');

var Homeless = React.createClass({
  render() {
    return this.props.invitations.length > 0
      ? this.renderInvitations()
      : this.renderCreateHousehold();
  },

  renderInvitations() {
    return (
      <Invitations
        invitations={this.props.invitations}
        submit={this.gotoCreateHousehold}
        join={this.handleJoinHousehold}
        decline={this.handleDeclineHousehold}
      />
    );
  },

  renderCreateHousehold() {
    return (
      <CreateHousehold
        submit={this.handleHouseholdCreation}
        gotoInviteRoommates={this.gotoInviteRoommates}
      />
    );
  },

  gotoInviteRoommates() {
    return (<InviteRoommates submit={this.handleInviteRoommates} />);
  },

  gotoCreateHousehold(/*TODO: payload*/) {

    this.props.dispatch();
  },

  handleHouseholdCreation(/*TODO: payload*/) {
    // dispatch action to store causing creation of new household
    this.props.dispatch(/*TODO: HOUSEHOLD CREATION*/);
  },

  handleJoinHousehold(/*TODO: payload*/) {
    //dispatch action to store causing update of joined household (user belongs to household --> go to homeTab)
    this.props.dispatch(/*TODO: JOIN HOUSEHOLD*/);
  },

  handleDeclineHousehold(/*TODO: payload*/) {
    //dispatch action to store causing removal of household invitation (updates invitation list in invitations UI)
    this.props.dispatch(/*TODO: REMOVE HOUSEHOLD INVITATION*/);
  },

  handleInviteRoommates(/*TODO: payload*/) {
    //dispatch action to store --> update store with creation of new invitation model in data.invitations
    this.props.dispatch(/*TODO: SEND INVITES*/);
  },

});

function select(state) {
  return {
    invitations: state.data.invitations,
    house: state.data.user.householdId,
  };
}

module.exports = connect(select)(Homeless);

