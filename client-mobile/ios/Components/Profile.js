'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} = React;

var Profile = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          // onPress={}
        >
        <Text>Username</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          // onPress={}
        >
        <Text>Deactivate</Text>
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

module.exports = Profile;
