'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Text,
  TextInput,
  LinkingIOS,
  StyleSheet,
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
          <Text style={Styles.page.pendingTitle} style={stylesheet.title}>{this.props.item.description}</Text>
          <Text style={Styles.input.textboxLabel} style={stylesheet.requestedBy}>Requested by: {this.props.creator.username}</Text>
            <TextInput style={Styles.input.textboxLabel} style={stylesheet.textboxField} keyboardType='default'multiline='true' placeholder='Tap to add notes...' />
          <Button onPress={this.buy} style={Styles.btn.btn} style={stylesheet.btn}>Mark as bought</Button>
          <Button onPress={this.browse} style={Styles.btn.btn} style={stylesheet.amazonBtn}>Search {this.props.item.description} on Amazon</Button>
        </View>
      );
    // editing & not buying
    } else if (this.state.isEditing && !this.state.isBuying) {
      return (
        <View style={Styles.default.container}>
          <Text style={Styles.page.pendingTitle}>{this.props.item.description}</Text>
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
          <Text style={Styles.page.pendingTitle}>{this.props.item.description}</Text>
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

var stylesheet = StyleSheet.create({
  title: {
    backgroundColor: '3d4e5b',
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 37,
    color: 'white',
    textAlign: 'center',
  },
  requestedBy: {
    color: '3d4e5b',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textboxField: {
    fontSize: 15,
    marginLeft: 30,
    marginRight: 30,
    height: 150,
    borderRadius: 5,
    borderColor: '#323232',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 15,
    textAlign: 'left',
    paddingTop: 10,
    paddingLeft: 10,
  },
  text: {
    color: 'grey',
    textAlign: 'left',
  },
  amazonBtn: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'cc5251',
    color: 'white',
    marginRight: 30,
    marginLeft: 30,
  },
  btn: {
    margin: 10,
    backgroundColor: '899ea3',
    color: 'white',
    padding: 10,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 5,
  },

});

module.exports = PendingItemDetails;
