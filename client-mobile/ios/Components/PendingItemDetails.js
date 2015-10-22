'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TextInput,
} = React;

var PendingItemDetails = React.createClass({
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
          <Text style={styles.itemName}>This is the PENDING item details view. It needs an input field.</Text>
          <TextInput
              input='number'
              style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5}}
              onChangeText={(price) => this.setState({price})}
              keyboardType='number-pad'
              textAlign='right'
              value={this.state.price}
            />
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

module.exports = PendingItemDetails;
