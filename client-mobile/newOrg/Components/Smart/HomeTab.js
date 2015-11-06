'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../Services/Actions');
var Icon = require('react-native-vector-icons/Ionicons');
var Styles = require('../../Styles/Styles');

var Items = require('./Items');
var Reckonings = require('./Reckonings');
var Settings = require('./Settings');

var {
  TabBarIOS,
} = React;

var HomeTab = React.createClass({

  render() {
    return (

      <TabBarIOS
        selectedTab={this.props.selectedTab}
        tintColor={Styles.iconColor}
      >
        <Icon.TabBarItem
          selected={this.props.selectedTab === 'items'}
          title='Items'
          iconName={'ios-cart'}
          iconSize={30}
          onPress={this.gotoItemsTab}
        >
          {this.renderItemsTabView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.props.selectedTab === 'reckonings'}
          title='Reckonings'
          iconName={'ios-pie'}
          iconSize={30}
          onPress={this.gotoReckoningsTab}
        >
          {this.renderReckoningsTabView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.props.selectedTab === 'settings'}
          title='Settings'
          iconName={'ios-gear'}
          iconSize={30}
          onPress={this.gotoSettingsTab}
        >
          {this.renderSettingsTabView()}
        </Icon.TabBarItem>
      </TabBarIOS>

    );

  },

  renderItemsTabView() {
    return <Items navigator={this.props.navigator} />;
  },

  renderReckoningsTabView() {
    return <Reckonings navigator={this.props.navigator} />;
  },

  renderSettingsTabView() {
    return <Settings navigator={this.props.navigator} />;
  },

  gotoItemsTab() {
    this.props.dispatch(Actions.setHomeTab('items'));
    // Probably unneeded due to navigator
    // this.props.dispatch(Actions.setItemsViewMode('list'));
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
