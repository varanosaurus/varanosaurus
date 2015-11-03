'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var Styles = require('../../../../Styles/Styles');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  LinkingIOS,
} = React;

var PendingItemDetails = React.createClass({

  getInitialState() {
    return ({
      details: this.props.item.details,
      isEditing: false,
      price: 0,
      isBuying: false,
      isOpen: false,
      isDisabled: false,
    });
  },

  openModal() {
    this.refs.modal.open();
  },

  edit() {
    this.setState({isEditing: true});
  },

  buy() {
    this.setState({isBuying: true});
  },

  cancel() {
    this.setState({isEditing: false, isBuying: false});
  },

  browse() {
    var queryStr = this.props.item.description.split(' ').join('+');
    LinkingIOS.openURL(
      'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=' + queryStr
    );
  },

  saveChanges() {
    this.setState({isEditing: false});
  },

  handleSubmit() {
    var updates = {};
    if (this.state.details !== this.props.item.details) {
      updates.details = this.state.details;
    }
    if (this.state.price) {
      updates.price = parseInt(this.state.price * 100, 10);
      updates.bought = true;
      updates.timeBought = new Date();
      this.props.gotoBoughtItemsList();
    }
    this.props.updateItem(updates);
    this.saveChanges();
  },

  render() {

    // not editing & not buying
    if (!this.state.isEditing && !this.state.isBuying) {
      return (
        <View style={styles.contentContainer}>
          <View style={styles.mainSection}>
            <Text style={styles.title}>Product: {this.props.item.description}</Text>
            <Text>Requested By: {this.props.creator.username}</Text>
            <Text>Details: {this.props.item.details}</Text>
            <Button onPress={this.edit} style={Styles.default.btn}>Edit</Button>
            <Button onPress={this.buy} style={Styles.default.btn}>Buy</Button>
            <Button onPress={this.browse} style={Styles.default.btn}>Browse Amazon</Button>
          </View>
        </View>
      );
    // editing & not buying
    } else if (this.state.isEditing && !this.state.isBuying) {
      return (
        <View style={styles.contentContainer}>
          <View style={styles.mainSection}>
            <Text style={styles.title}>Product: {this.props.item.description}</Text>
            <Text>Requested By: {this.props.creator.username} </Text>
            <Text>Details: </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(details) => this.setState({details})}
              value={this.state.details}
            />
            <Button
              onPress={this.handleSubmit}
              style={Styles.default.btn}>
              Submit Changes
            </Button>
            <Button onPress={this.cancel} style={Styles.default.btn}>Cancel</Button>
          </View>
        </View>
      );
    // not editing & buying
    } else if (!this.state.isEditing && this.state.isBuying) {
      return (
        <View style={styles.contentContainer}>
          <View style={styles.mainSection}>
            <Text style={styles.title}>Product: {this.props.item.description}</Text>
            <Text>Requested By: {this.props.creator.username} </Text>
            <Text>Details: {this.props.item.details} </Text>
            <TextInput
              keyboardType='number-pad'
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(price) => this.setState({price})}
              value={this.state.price}
            />
            <Button
              onPress={this.handleSubmit}
              style={Styles.default.btn}>
              Enter Price
            </Button>
            <Button onPress={this.cancel} style={Styles.default.btn}>Cancel</Button>
          </View>
        </View>
      ); //closes return
    } //closes editing and not buying
  }, //closes render
}); //closes class

module.exports = PendingItemDetails;

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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
