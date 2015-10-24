'use strict';
var React = require('react-native');
var Button = require('react-native-button');
var Modal = require('react-native-modal');
var BoughtItemDetails = require('./BoughtItemDetails');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
} = React;

var PendingItemDetails = React.createClass({
  getInitialState: function() {
    return ({
      details: this.props.item.details,
      isEditing: false,
      price: 0,
      isBuying: false,
      isOpen: false,
      isDisabled: false,
    });
  },

  openModal: function() {
    this.refs.modal.open();
  },

  edit: function() {
    this.setState({isEditing: true});
  },

  buy: function() {
    this.setState({isBuying: true});
  },

  saveChanges: function() {
    this.setState({isEditing: false});
  },

  render: function() {

    // not editing & not buying
    if (!this.state.isEditing && !this.state.isBuying) {
      return (
        <View style={styles.contentContainer}>
          <View style={styles.mainSection}>
            <Text style={styles.title}>Product: {this.props.item.itemName}</Text>
            <Text>Requested By: {this.props.item.requestedBy}</Text>
            <Text>Details: "{this.props.item.details}"</Text>
            <Button onPress={this.edit} style={styles.btn}>Edit</Button>
            <Button onPress={this.buy} style={styles.btn}>Buy</Button>
          </View>
        </View>
      );
    // editing & not buying
    } else if (this.state.isEditing && !this.state.isBuying) {
      return (
        <View style={styles.contentContainer}>
          <View style={styles.mainSection}>
            <Text style={styles.title}>Product: {this.props.item.itemName}</Text>
            <Text>Requested By: {this.props.item.requestedBy}</Text>
            <Text>Details: </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(details) => this.setState({details})}
              value={this.state.details}
            />
            <Button
              onPress={this.saveChanges}
              style={styles.btn}>
              Save Changes
            </Button>
          </View>
        </View>
      );
    // not editing & buying
    } else if (!this.state.isEditing && this.state.isBuying) {
      return (
        <View style={styles.contentContainer}>
          <View style={styles.mainSection}>
            <Text style={styles.title}>Product: {this.props.item.itemName}</Text>
            <Text>Requested By: {this.props.item.requestedBy}</Text>
            <Text>Details: "{this.props.item.details}"</Text>
            <TextInput
              keyboardType='number-pad'
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(price) => this.setState({price})}
              value={this.state.price}
            />
            <Button
              onPress={this.openModal}
              style={styles.btn}>
              Enter Price
            </Button>
          </View>
            <Modal
              style={styles.modal}
              ref={"modal"}>
              <BoughtItemDetails item={this.props.item}/>
            </Modal>
        </View>
      );
    }

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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = PendingItemDetails;
