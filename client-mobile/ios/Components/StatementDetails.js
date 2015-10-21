'use strict';

var React = require('react-native');
var MyInfo = require('./MyInfo');
var ByItemList = require('./ByItemList');
var ByPersonList = require('./ByPersonList');
var ByItemDetails = require('./ByItemDetails');
var ByPersonDetails = require('./ByPersonDetails');

var {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} = React;

var StatementDetails = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: 'My Info'
    }
  },

  render: function() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'My Info'}
          title='My Info'
          onPress={ () => {
            this.setState({
              selectedTab: 'My Info'
            });
          }}
        >
        <MyInfo />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'By Item'}
          title='By Item'
          onPress={ () => {
            this.setState({
              selectedTab: 'By Item'
            })
          }}
        >
        <ByItemList
          onSelectByItem={ (byItem) => {
            this.props.navigator.push({
              title: byItem.itemName,
              component: ByItemDetails,
              passProps: {byItem}
            });
          }}
        />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'By Person'}
          title='By Person'
          onPress={ () => {
            this.setState({
              selectedTab: 'By Person'
            })
          }}
        >
        <ByPersonList
          onSelectByPerson={ (byPerson) => {
            this.props.navigator.push({
              title: byPerson.personName,
              component: ByPersonDetails,
              passProps: {byPerson}
            });
          }}
        />
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }

});

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF'
  },
  statementName: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: '500',
  },
  mainSection: {
    flex: 1,
  }
});

module.exports = StatementDetails;
