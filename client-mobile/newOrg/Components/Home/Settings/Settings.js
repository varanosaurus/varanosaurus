'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../../Actions/Actions');
var Routes = require('../../../Services/Routes');

var SettingsOptions = require('./dumb/SettingsOptions');

var Settings = React.createClass({
  render() {
    return this.renderSettingsOptions();
  },

  renderSettingsOptions() {
    return (
      <SettingsOptions
        logout={this.logout}
        gotoInviteRoommates={this.gotoInviteRoommates}
      />
    );
  },

  // renderInviteRoommates() {
  //   return (
  //     <InviteRoommates submit={this.handleInviteRoommates} />
  //   );
  // },

  // TODO: Roommate invitation handler should be passed from Routes service
  // handleInviteRoommates() {

  // },

  logout() {
    console.log('called from logout in Settings.js');
    this.props.dispatch(Actions.logout());
  },

  gotoInviteRoommates() {
    // this.props.dispatch(Actions.setSettingsViewMode('invite'));
    this.props.navigator.push(Routes.inviteRoommatesView);
  },

});

function select(state) {
  return {
    settingsViewMode: state.uiMode.settingsViewMode,
  };
}

module.exports = connect(select)(Settings);

