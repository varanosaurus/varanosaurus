'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../Actions/Actions');

var Homeless = require('./Homeless/Homeless');
var HomeTab = require('./dumb/HomeTab');

var Home = React.createClass({

  render() {
    return this.props.house //user belongs to a household (has a householdId)
      ? this.renderHomeTab()
      : this.renderHomeless();
  },

  renderHomeless() {
    return <Homeless />;
  },

  renderHomeTab() {
    return <HomeTab
      selectedTab={this.props.selectedHomeTab}
      gotoItemsTab={this.gotoItemsTab}
      gotoReckoningsTab={this.gotoReckoningsTab}
      gotoSettingsTab={this.gotoSettingsTab}
    />;
  },

  gotoItemsTab() {
    this.props.dispatch(Actions.setHomeTab('items'));
  },
  gotoReckoningsTab() {
    this.props.dispatch(Actions.setHomeTab('reckonings'));
  },
  gotoSettingsTab() {
    this.props.dispatch(Actions.setHomeTab('settings'));
  },

});

function select(state) {
  return {
    house: state.data.user.householdId,
    selectedHomeTab: state.uiMode.selectedHomeTab,
  };
}

module.exports = connect(select)(Home);
