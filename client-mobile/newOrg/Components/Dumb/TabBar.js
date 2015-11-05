'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var Totals = require('./UserTotals');
var Payments = require('./Payments');

var {
  TabBarIOS,
} = React;

var TabBar = React.createClass({

  render() {
    return (
      <TabBarIOS selectedTab={this.props.selectedTab}>

        <Icon.TabBarItem
          selected={this.props.selectedTab === 'totals'}
          onPress={this.props.gotoTotals}
          title='Totals'
          iconSize={40}
          iconName='ios-list'
        >
          {this.renderTotals()}
        </Icon.TabBarItem>

        <Icon.TabBarItem
          selected={this.props.selectedTab === 'payments'}
          onPress={this.props.gotoPayments}
          title='Payment Breakdown'
          iconSize={40}
          iconName='cash'
        >
          {this.renderPayments()}
        </Icon.TabBarItem>

      </TabBarIOS>
      );
  },

  renderTotals() {
    return <Totals users={this.props.reckoning.users} />;
  },

  renderPayments() {
    return <Payments payments={this.props.reckoning.payments} />;
  },

});

module.exports = TabBar;
