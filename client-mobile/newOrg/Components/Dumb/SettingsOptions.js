'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  // Text,
} = React;

var SettingsOptions = React.createClass({
  render() {
    return (
      <View style={Styles.default.container}>
        <Button onPress={this.props.logout} style={Styles.default.btn}>
          Logout
        </Button>
        <Button onPress={this.props.gotoInviteRoommates} style={Styles.default.btn}>
          Invite Roommates
        </Button>
        <Button onPress={this.props.gotoConfirmLeave} style={Styles.default.btn}>
          Leave Household
        </Button>

      </View>
    );
  },

});

module.exports = SettingsOptions;
