'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} = React;

var JoinOrCreateHousehold = React.createClass({
  getInitialState() {
    return ({
      invitations: this.props.invitations,
      householdName: '',
      acceptedInvitation: '',
      declinedInvitation: '',
    });
  },

  render() {
    var invitations = this.state.invitations;
    return (
      <View>
        {
          invitations.map(function(invitation) {
            return (
              <Text>You have been invited to the {invitation.householdName} household!</Text>
              // <TouchableHighlight onPress={}>
              //   <Text>Join</Text>
              // </TouchableHighlight>
              // <TouchableHighlight onPress={}>
              //   <Text>Decline</Text>
              // </TouchableHighlight>
            );
          })
        }
        <Text> ----- OR----- </Text>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='What is your household name?'
          onChangeText={(householdName) => this.setState({householdName: householdName})}
          value={this.state.householdName}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            this.handleSubmit();
            this.props.gotoInviteRoommates();
          }}
        >
          <Text style={styles.btnText}>Create household</Text>
        </TouchableHighlight>
      </View>
    );
  },

  joinHousehold(invitation) {
    this.props.join(invitation);
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

