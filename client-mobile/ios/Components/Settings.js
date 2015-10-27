'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
} = React;

var Settings = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>TESTING</Text>
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

module.exports = Settings;
