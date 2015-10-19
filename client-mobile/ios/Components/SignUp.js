'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Navigator,
  TouchableHighlight,
  View,
  Text,
} = React;

var SignUp = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>This is working. Wooh!</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    backgroundColor: 'white'
  }
});

module.exports = SignUp;
