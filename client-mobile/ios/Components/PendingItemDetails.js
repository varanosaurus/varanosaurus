'use strict';

var React = require('react-native');
// var Button = require('react-native-button');

var {
  StyleSheet,
  Text,
  View,
} = React;

var PendingItemDetails = React.createClass({
  getInitialState: function() {
    return ({
       price: 0,
    });
  },

  // rednerScene: function() {
  //   return ()
  // },

  render: function() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.mainSection}>
          <Text style={styles.title}>Product: {this.props.item.itemName}</Text>
          <Text>Requested By: {this.props.item.requestedBy}</Text>
          <Text>Details: "{this.props.item.details}"</Text>
          <Button onPress={this.renderScene} style={styles.btn}>Buy</Button>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
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
    marginTop: 64,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  btn: {
    margin: 10,
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
  },
});

module.exports = PendingItemDetails;
