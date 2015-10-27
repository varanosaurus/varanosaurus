'use strict';

var React = require('react-native');

var {
  // StyleSheet,
  View,
  Text,
  TouchableHighlight,
} = React;

var Invitations = React.createClass({

  render() {
    return (
      <View>
        <Text>You've been invited to the {this.props.household.name} household!</Text>
        <TouchableHighlight onPress={this.props.join}><Text>Join</Text></TouchableHighlight>
        <TouchableHighlight onPress={this.props.decline}><Text>Decline</Text></TouchableHighlight>
        <Text> ----- OR----- </Text>
        <TouchableHighlight
          onPress={this.props.submit}
        >
          <Text>Create Household</Text>
        </TouchableHighlight>
      </View>
    );
  },

});

module.exports = Invitations;
