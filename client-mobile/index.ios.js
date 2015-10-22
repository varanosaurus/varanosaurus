'use strict';

var React = require('react-native');
var Root = require('./ios/Components/Root');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var Knead = React.createClass({

  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Knead',
          component: Root,
        }}
      />
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('Knead', () => Knead);
