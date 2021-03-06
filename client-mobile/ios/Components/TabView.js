'use strict';

var React = require('react-native');
var ItemList = require('./ItemList');
var PendingItemDetails = require('./PendingItemDetails');
var BoughtItemDetails = require('./BoughtItemDetails');
var StatementList = require('./StatementList');
var StatementDetails = require('./StatementDetails');
var More = require('./More');
var Profile = require('./Profile');
var Roommates = require('./Roommates');
var Notifications = require('./Notifications');

var {
  TabBarIOS,
} = React;

var TabView = React.createClass({

  getInitialState: function() {
    return ({
      selectedTab: 'household',
    });
  },

  render: function() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'household'}
          title='Household'
          onPress={ () => {
            this.setState({
              selectedTab: 'household',
            });
          }}
        >
        <ItemList
          onSelectPendingItem={ (item) => {
            this.props.navigator.push({
              title: item.itemName,
              component: PendingItemDetails,
              passProps: {item},
            });
          }}
          onSelectBoughtItem={ (item) => {
            this.props.navigator.push({
              title: item.itemName,
              component: BoughtItemDetails,
              passProps: {item},
            });
          }}
        />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'reckoning'}
          title='Reckoning'
          onPress={ () => {
            this.setState({
              selectedTab: 'reckoning',
            });
          }}
        >
        <StatementList
          onSelectStatement={ (statement) => {
            this.props.navigator.push({
              title: 'Reckoning',
              component: StatementDetails,
              passProps: {statement},
            });
          }}
        />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'more'}
          title='More'
          onPress={ () => {
            this.setState({
              selectedTab: 'more',
            });
          }}
        >
        <More
          SelectProfile={ () => {
            this.props.navigator.push({
              title: 'Edit Profile',
              component: Profile,
            });
          }}
          SelectRoommates={ () => {
            this.props.navigator.push({
              title: 'Edit Roommates',
              component: Roommates,
            });
          }}
          SelectNotifications={ () => {
            this.props.navigator.push({
              title: 'Edit Notifications',
              component: Notifications,
            });
          }}
        />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

// var styles = StyleSheet.create({
// });


module.exports = TabView;
