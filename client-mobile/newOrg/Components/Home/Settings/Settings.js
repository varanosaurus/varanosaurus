'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

// var Actions = require('../../../Actions/Actions');

var SettingsOptions = require('./dumb/SettingsOptions');
var InviteRoommates = require('./dumb/InviteRoommates');

var Settings = React.createClass({
  render() {
    return this.props.uiMode === 'options'
      ? this.renderSettingsOptions()
      : this.renderInviteRoommates();
  },

  renderSettingsOptions() {
    return (
      <SettingsOptions />
    );
  },

  renderInviteRoommates() {
    return (
      <InviteRoommates submit={this.handleInviteRoommates} />
    );
  },

  handleInviteRoommates() {

  },

});

function select(state) {
  return {
    uiMode: state.uiMode.settingsViewMode,
  };
}

module.exports = connect(select)(Settings);
