'use strict';

var React = require('react-native');

var {connect} = require('react-redux');

var Actions = require('../../../Actions/Actions');

var Items = require('../Items/Items');
var Reckonings = require('../Reckonings/Reckonings');
var Settings = require('../Settings/Settings');

var {
  TabBarIOS,
  Text,
  // StyleSheet,
} = React;

var HomeTab = React.createClass({

  render() {

    return (

      <TabBarIOS selectedTab={this.props.selectedTab}>
        <TabBarIOS.Item
          selected={this.props.selectedTab === 'items'}
          title='Items'
          onPress={this.gotoItemsTab}
        >
          {this.renderItemsTabView()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.props.selectedTab === 'reckonings'}
          title='Reckonings'
          onPress={this.gotoReckoningsTab}
        >
        <Text>Reckonings View!!!</Text>
          {/*this.renderReckoningsTabView()*/}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.props.selectedTab === 'settings'}
          title='Settings'
          onPress={this.gotoSettingsTab}
        >
          {this.renderSettingsTabView()}
        </TabBarIOS.Item>
      </TabBarIOS>

    );

  },

  renderItemsTabView() {
    return <Items />;
  },

  renderReckoningsTabView() {
    return <Reckonings />;
  },

  renderSettingsTabView() {
    return <Settings />;
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
    selectedTab: state.uiMode.selectedHomeTab,
  };
}

module.exports = connect(select)(HomeTab);

