'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Component,
} = React;

var Household = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          This is going to be the HOUSEHOLD VIEW
        </Text>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  description: {
    fontSize: 20
  },
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: 'white'
  }

})

module.exports = Household;
