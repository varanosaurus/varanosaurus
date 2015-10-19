'use strict';

var React = require('react-native');
// var SignUp = require('./ios/Components/SignUp');
// var Login = require('./ios/Components/Login');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} = React;

var Root = React.createClass({
  signUp: function() {
    this.props.navigator.push({
      index: 1,
      id: 'Sign up'
    })
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
          onPress={() => this.login()}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    height: 36,
    flex: 1,
    margin: 2,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 18,
    color: 'white'
  }
});

module.exports = Root;
