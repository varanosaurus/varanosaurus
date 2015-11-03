'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
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
        <View style={Styles.default.container}>
          <Text style={Styles.page.pendingTitle}>Product: {this.props.item.description}</Text>
          <Text style={Styles.input.textboxLabel}>Requested By: {this.props.creator.username}</Text>
          <Text style={Styles.input.textboxLabel}>Details: {this.state.details}</Text>
          <Button onPress={this.edit} style={Styles.btn.btn}>Edit</Button>
          <Button onPress={this.buy} style={Styles.btn.btn}>Buy</Button>
          <Button onPress={this.browse} style={Styles.btn.btn}>Browse Amazon</Button>
        </View>
      );
    // editing & not buying
    } else if (this.state.isEditing && !this.state.isBuying) {
      return (
        <View style={Styles.default.container}>
          <Text style={Styles.page.pendingTitle}>Product: {this.props.item.description}</Text>
          <Text style={Styles.input.textboxLabel}>Requested By: {this.props.creator.username} </Text>
          <Text style={Styles.input.textboxLabel}>Details: {this.state.details}</Text>
          <TextInput
            style={Styles.input.textboxField}
            placeholder='Update description here'
            onChangeText={(details) => this.setState({details})}
            value={this.state.details}
          />
          <Button
            onPress={this.handleSubmit}
            style={Styles.btn.btn}>
            Submit Changes
          </Button>
          <Button onPress={this.cancel} style={Styles.btn.btn}>Cancel</Button>
        </View>
      );
    // not editing & buying
    } else if (!this.state.isEditing && this.state.isBuying) {
      return (
        <View style={Styles.default.container}>
          <Text style={Styles.page.pendingTitle}>Product: {this.props.item.description}</Text>
          <Text style={Styles.input.textboxLabel}>Requested By: {this.props.creator.username} </Text>
          <Text style={Styles.input.textboxLabel}>Details: {this.state.details} </Text>
          <TextInput
            keyboardType='decimal-pad'
            style={Styles.input.textboxField}
            placeholder='Price'
            onChangeText={(price) => this.setState({price})}
            value={this.state.price}
          />
          <Button
            onPress={this.handleSubmit}
            style={Styles.btn.btn}>
            Enter Price
          </Button>
          <Button onPress={this.cancel} style={Styles.btn.btn}>Cancel</Button>
        </View>
      ); //closes return
    } //closes editing and not buying
  }, //closes render
}); //closes class

module.exports = PendingItemDetails;
