'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../../Actions/Actions');
var Routes = require('../../../Services/Routes');

var SettingsOptions = require('./dumb/SettingsOptions');
var ConfirmLeave = require('./dumb/confirmLeave');
var ReckonAndLeave = require('./dumb/reckonAndLeave');

var Settings = React.createClass({

  render() {
    switch (this.props.settingsViewMode) {
      case 'invite':
        this.navigateToInviteRoommates();
        // FALLTHROUGH
      case 'options':
        return this.renderSettingsOptions();
      case 'confirm':
        return this.renderConfirmLeave();
      case 'leave':
        return this.renderReckonAndLeave();
      default:
        return this.renderSettingsOptions();
    }
  },

  renderSettingsOptions() {
    return (
      <SettingsOptions
        logout={this.logout}
        gotoInviteRoommates={this.gotoInviteRoommates}
        gotoConfirmLeave={this.gotoConfirmLeave}
      />
    );
  },

  renderConfirmLeave() {
    return (
      <ConfirmLeave
        gotoReckonAndLeave={this.gotoReckonAndLeave}
        gotoSettingsOptions={this.gotoSettingsOptions}
      />
    );
  },

  renderReckonAndLeave() {
    return (
      <ReckonAndLeave
        selectedReckoning={this.props.selectedReckoning}
        username={this.props.username}
        contribution={this.props.contribution}
        debt={this.props.debt}
      />
    );
  },

  logout() {
    this.props.dispatch(Actions.logout());
  },

  navigateToInviteRoommates() {
    this.props.navigator.push(Routes.inviteRoommatesView);
  },

  gotoInviteRoommates() {
    this.props.dispatch(Actions.setSettingsViewMode('invite'));
  },

  gotoConfirmLeave() {
    this.props.dispatch(Actions.setSettingsViewMode('confirm'));
  },

  gotoReckonAndLeave() {
    // this.props.dispatch(Actions.initiateReckoning());
    this.props.dispatch(Actions.setSettingsViewMode('leave'));
    // this.props.dispatch(Actions.fetchSelectedReckoning());
  },

  gotoSettingsOptions() {
    this.props.dispatch(Actions.setSettingsViewMode('options'));
  },

});

function select(state) {

  var contribution = null;
  var debt = null;
  if (state.data.selectedReckoning) {
    for (var i = 0; i < state.data.selectedReckoning.users.length; i++) {
      if (state.data.selectedReckoning.users[i].username === state.data.user.username) {
        contribution = state.data.selectedReckoning.users[i].userToReckoning.contribution;
        debt = state.data.selectedReckoning.users[i].userToReckoning.debt;
      }
    }
  }

  return {
    settingsViewMode: state.uiMode.settingsViewMode,
    selectedReckoning: state.data.selectedReckoning,
    username: state.data.user.username,
    contribution,
    debt,
  };
}

module.exports = connect(select)(Settings);

