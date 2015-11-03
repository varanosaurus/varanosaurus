'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Text,
} = React;

var ReckonAndLeave = React.createClass({

  render() {
    return (
      <View style={Styles.default.container}>
        <Text>
          Ok, {this.props.username}. Before you go, we crunched your numbers.
          This month, you contributed ${this.props.contribution} and you'll owe your roommates ${this.props.debt}.
        </Text>
        <Button style={Styles.btn.btn} onPress={this.props.leaveHousehold}>
          Got it. Get me outta here!
        </Button>
      </View>
    );
  },

});

module.exports = ReckonAndLeave;
