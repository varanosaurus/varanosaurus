'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var BoughtItemDetails = React.createClass({
  getInitialState: function() {
    return ({
       price: 0,
    });
  },
  render: function() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.mainSection}>
          <Text style={styles.title}>Product: {this.props.item.itemName}</Text>
          <Text>Requested By: {this.props.item.requestedBy}</Text>
          <Text>Details: "{this.props.item.details}"</Text>
          <Text style={styles.itemName}>This is the BOUGHT item details view. BOUGHT item details view doesn't need an input field.</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 64,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 39,
    color: 'gray',
  },
  itemName: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: '500',
  },
  mainSection: {
    flex: 1,
  },
});

module.exports = BoughtItemDetails;
