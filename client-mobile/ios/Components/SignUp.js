'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} = React;

var SignUp = React.createClass({
  joinOrCreateHousehold: function() {
    this.props.navigation.push()
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='username' />
        <TextInput style={styles.input} placeholder='password' secureTextEntry='true'/>
        <TouchableHighlight 
          style={styles.button}
          onPress={() => this.joinOrCreateHousehold()}
        >
          <Text style={styles.btnText}>Sign Up</Text>
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
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  button: {
    height: 15,
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

module.exports = SignUp;
