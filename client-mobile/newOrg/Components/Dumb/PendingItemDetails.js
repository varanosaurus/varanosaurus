'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Text,
  TextInput,
  LinkingIOS,
  Image,
} = React;

var PendingItemDetails = React.createClass({

  getInitialState() {
    this.cachedDetails = this.props.item.details;

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
    this.cachedDetails = this.state.details;
    this.saveChanges();
  },

  render() {
    var editButtonDisabledStyle = {};
    var editButtonText;
    var editButtonHandler;

    if (this.state.details === this.cachedDetails) {
      editButtonDisabledStyle.backgroundColor = '#CCC';
      editButtonText = 'Details synced';
    } else {
      editButtonText = 'Save changes';
      editButtonHandler = this.handleSubmit;
    }

    // not editing & not buying
    if (!this.state.isEditing && !this.state.isBuying) {
      return (
        <View style={{flex: 1}}>
          <Image
            source={{uri: Styles.patternURI}}
            style={Styles.background.belowNavbarArea}>
            <View style={Styles.list.container}>
              <Text style={Styles.page.pendingTitle}>{this.props.item.description}</Text>
              <Text style={Styles.input.textboxLabel}>Requested by: {this.props.creator.username}</Text>
                <TextInput
                  style={Styles.input.textboxDetails}
                  keyboardType='default'
                  placeholder='Tap to add notes...'
                  onChangeText={(details) => this.setState({details})}
                  value={this.state.details}
                  placeholderTextColor={Styles.placeholderColor}
                />
              <Button onPress={editButtonHandler} style={[Styles.btn.btn, editButtonDisabledStyle]}>{editButtonText}</Button>
              <Button onPress={this.buy} style={Styles.btn.btn}>Mark as bought</Button>
              <Button onPress={this.browse} style={Styles.btn.accentBtn}>Search {this.props.item.description} on Amazon</Button>
            </View>
          </Image>
        </View>
      );
    } // not editing & buying
     else if (!this.state.isEditing && this.state.isBuying) {
      return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: Styles.patternURI}}
          style={Styles.background.belowNavbarArea}>
          <View style={Styles.list.container}>
            <Text style={Styles.page.pendingTitle}>{this.props.item.description}</Text>
            <Text style={Styles.input.textboxLabel}>Requested by: {this.props.creator.username} </Text>
            <Text style={Styles.input.textboxLabel}>Details: {this.state.details} </Text>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Text style={{fontSize: 30, marginLeft: 22, paddingRight: 7, color: 'white'}}>$</Text>
              <View style={{flex: 7, marginLeft: 0}}>
                <TextInput
                  keyboardType='decimal-pad'
                  style={[Styles.input.textboxField, {marginLeft: 0}]}
                  placeholder='Enter price'
                  onChangeText={(price) => this.setState({price})}
                  value={this.state.price}
                  placeholderTextColor={Styles.placeholderColor}
                />
              </View>
            </View>
            <Button
              onPress={this.handleSubmit}
              style={Styles.btn.btn}>
              Save
            </Button>
            <Button onPress={this.cancel} style={Styles.btn.accentBtn}>Cancel</Button>
          </View>
        </Image>
      </View>
      ); //closes return
    } //closes editing and not buying
  }, //closes render
}); //closes class


module.exports = PendingItemDetails;
