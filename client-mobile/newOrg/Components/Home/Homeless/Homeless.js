'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var CreateHousehold = require('./dumb/CreateHousehold');
var Invitations = require('./dumb/Invitations');
var RoommateInvitations = require('./dumb/RoommateInvitations');

var Homeless = React.createClass({
  render() {
    return this.props.invitations.length > 0
      ? renderInvitations()
      : renderCreateHousehold();
  },
});

renderInvitations() {
  return <Invitations submit={this.renderCreateHousehold}/>;
},

renderCreateHousehold() {
  return <CreateHousehold 
    submit={this.handleHouseholdCreation} 
    gotoRoommateInvitations={this.gotoRoommateInvitations}
  />;
},

handleHouseholdCreation(/*TODO: payload*/) {
  // dispatch action to store causing creation of new household
  this.props.dispatch(/*TODO: HOUSEHOLD CREATION*/)
},

gotoRoommateInvitations() {
  return <RoommateInvitations />
}

function select(state) {
  return {
    invitations: state.data.invitations,
    household: state.data.household,
  };
}

module.exports = connect(select)(Homeless);
