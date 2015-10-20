'use strict';

var React = require('react-native');
var Root = require('./ios/Components/Root');
var SignUp = require('./ios/Components/SignUp');
var LogIn = require('./ios/Components/LogIn');

var {
  AppRegistry,
  StyleSheet,
  Navigator,
} = React;

var Knead = React.createClass({

  renderScene: function(route, navigator) {
    switch (route.id) {
      case 'Sign up / Login':
        return <Root navigator={navigator}/>
      case 'Sign up':
        return <SignUp navigator={navigator}/>
      case 'Log in':
        return <LogIn navigator={navigator}/>
    }

  },

  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          index: 0,
          id: 'Sign up / Login'
        }}
        renderScene={this.renderScene}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('Knead', () => Knead);
