/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var HomeView = require('./ios/Components/homeView');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;


var Knead = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: HomeView,
          title: 'knead'
        }}
        style={styles.container}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Knead', () => Knead);
