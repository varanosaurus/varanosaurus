'use strict';

var React = require('react-native');
var NotInvitedToHH = require('./NotInvitedToHH');
var InvitedToHH = require('./InvitedToHH');
var CreateNewHH = require('./CreateNewHH');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} = React;

var SignUp = React.createClass({
  joinOrCreateHousehold: function() {
    //if you are not in a household
    this.props.navigator.push({
      title: 'Create New HH',
      component: CreateNewHH
    })

    //NOTE: need to receive data from the server re: if user was invited to HH or not
    //if you are in a household
    // this.props.navigator.push({
    //   index: 4,
    //   id: 'Invited'
    // })
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='username' keyboardType='default'/>
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
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray', 
    borderWidth: 1,
  },
  button: {
    flex: 1,
    margin: 100,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 10,
    color: 'white',
  }
});

module.exports = SignUp;
