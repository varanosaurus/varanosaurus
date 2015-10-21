'use strict';

var React = require('react-native');
var SignUp = require('./SignUp');
var LogIn = require('./LogIn');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} = React;

var Root = React.createClass({
  signUp: function() {
    this.props.navigator.push({
      title: 'Sign up',
      component: SignUp,
    });

  },
  logIn: function() {
    this.props.navigator.push({
      title: 'Login',
      component: LogIn,
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.signUp()}
        >
          <Text style={styles.btnText}>Sign Up</Text>

        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.logIn()}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2fb4da',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
});

module.exports = Root;
