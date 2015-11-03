'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Text,
} = React;

var ConfirmLeave = React.createClass({
  render() {
    return (
      <View style={Styles.default.container}>
        <Text>Are you sure you want to leave?</Text>
        <Button style={Styles.btn.btn} onPress={this.props.gotoReckonAndLeave}>
          Yes
        </Button>
        <Button style={Styles.btn.btn} onPress={this.props.gotoSettingsOptions}>
          No
        </Button>
      </View>
    );
  },

});

module.exports = ConfirmLeave;
