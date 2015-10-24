'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Homeless = require('./Homeless/Homeless');
var HomeTab = require('/dumb/HomeTab');

var Home = React.createClass({

  render() {
    return this.props.house 
      ? this.renderHomeTab()
      : this.renderHomeless();
  },

  renderHomeless() {
    return <Homeless />;
  },  

  renderHomeTab() {
    return <HomeTab 
      uiMode={this.props.selectedHomeTab}
      {...tabHandlers}
    />;
  },

});

function select(state) {
  return {
    house: state.data.household, 
    selectedHomeTab: state.uiMode.selectedHomeTab,
  };
}

var tabHandlers = {
  gotoItemsTab() {
    //TODO: ACTION - UPDATE uiMODE to ItemsTab
  },
  gotoReckoningsTab() {
    //TODO: ACTION - UPDATE uiMODE to ReckoningsTab
  },
  gotoSettingsTab() {
    //TODO: ACTION - UPDATE uiMODE to SettingsTab
}

module.exports = connect(select)(Home);



