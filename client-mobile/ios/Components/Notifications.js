'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} = React;

var Notifications = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
        >
        <Text>Notification Settings: {this.props.settings}</Text>
        </TouchableHighlight>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#EDEBE8',
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnText: {
    fontSize: 18,
  },
});

module.exports = Notifications;
