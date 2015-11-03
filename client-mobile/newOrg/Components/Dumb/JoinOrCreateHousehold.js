'use strict';

//TODO: refactor this to only have the add household part here once

var React = require('react-native');
var Button = require('react-native-button');
var Styles = require('../../Styles/Styles');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
} = React;

var JoinOrCreateHousehold = React.createClass({

  getInitialState() {
    return {
      householdName: '',
    };
  },

  render() {
    var self = this;
    if (this.props.invitations.length === 0) {
      return (
        <View>
          <Text>If you think you have been invited to a household, please check with your roommate and remind them to invite you.</Text>
          <Text> ----- OR ----- </Text>
          <Text> Create a household </Text>
          <TextInput
            style={styles.input}
            keyboardType='default'
            placeholder='What is your household name?'
            onChangeText={(householdName) => this.setState({householdName: householdName})}
            value={this.state.householdName}
          />
          <Button
            style={styles.default.btn}
            onPress={this.handleSubmit} >
            Create household
          </Button>
        </View>
      );
    } else {
      return (
        <View>
          {
            this.props.invitations.map(function(invitation) {
              return (
                <View>
                  <Text key={invitation.householdName}>You have been invited to the {invitation.householdName} household!</Text>
                  <Button
                    style={Styles.default.btn}
                    onPress={self.props.respondToInvitation('accepted', invitation.id)}>
                    Join
                  </Button>
                  <Button
                    style={Styles.default.btn}
                    onPress={self.props.respondToInvitation('rejected', invitation.id)}>
                    Decline
                  </Button>
                </View>
              );
            })
          }
          <Text>----- OR-----</Text>
          <Text>Create a household</Text>
          <TextInput
            style={styles.input}
            keyboardType='default'
            placeholder='What is your household name?'
            onChangeText={(householdName) => this.setState({householdName: householdName})}
            value={this.state.householdName}
          />
          <Button
            style={styles.default.btn}
            onPress={this.handleSubmit} >
            Create household
          </Button>
        </View>
      );
    }
  },

  handleSubmit() {
    var household = this.state.householdName;
    this.props.submit(household);
  },

});

module.exports = JoinOrCreateHousehold;

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
    paddingTop: 10,
    paddingBottom: 10,
    margin: 2,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
  errorHandling: {
    color: 'red',
  },
});

