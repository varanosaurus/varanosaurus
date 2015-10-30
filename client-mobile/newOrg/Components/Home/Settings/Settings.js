'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../../Actions/Actions');

var SettingsOptions = require('./dumb/SettingsOptions');
var InviteRoommates = require('./dumb/InviteRoommates');

var Settings = React.createClass({
  render() {
    return this.props.settingsViewMode === 'options'
      ? this.renderSettingsOptions()
      : this.renderInviteRoommates();
  },

  renderSettingsOptions() {
    return (
      <SettingsOptions
        logout={this.logout}
        gotoInviteRoommates={this.gotoInviteRoommates}
      />
    );
  },

  renderInviteRoommates() {
    return (
      <InviteRoommates submit={this.handleInviteRoommates} />
    );
  },

  handleInviteRoommates() {

  },

  logout() {
    console.log('called from logout in Settings.js');
    this.props.dispatch(Actions.logout());
  },

  gotoInviteRoommates() {
    this.props.dispatch(Actions.setSettingsViewMode('invite'));
  },

});

function select(state) {
  return {
    settingsViewMode: state.uiMode.settingsViewMode,
  };
}

module.exports = connect(select)(Settings);

