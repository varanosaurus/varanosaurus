'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} = React;

// {
//   seen: true,
//   seenAt: 2015-06-10,
//   id: 1,
//   createdAt: 2015-06-10,
//   updatedAt: 2015-06-10,
//   fromUserId: 25,
//   toUserId: 2,
//   householdId: 2,
//   status: 'pending'
// }

var JoinOrCreateHousehold = React.createClass({
  getInitialState() {
    return ({
      invitations: [{householdName: 'householdName1'}, {householdName: 'householdName2'}],
      // this.props.invitations.received,
      // [{householdName: "householdName1"},{householdName: "householdName2"}]
      householdName: '',
      acceptedInvitation: '',
      declinedInvitation: '',
    });
  },

  render() {
    var self = this;
    var invitations = this.state.invitations;
    if (invitations.length === 0) {
      return (
        <View>
          <Text>If your roommate has not invited you to the household yet, remind them. (FIX MESSAGING)</Text>
          <Text> ----- OR ----- </Text>
          <Text> Create a household </Text>
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
            }}
          >
            <Text style={styles.btnText}>Create household</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View>
          {
            invitations.map(function(invitation) {
              return (
                <View>
                  <Text key={invitation.householdName}>You have been invited to the {invitation.householdName} household!</Text>
                  <TouchableHighlight onPress={() => {self.props.join(invitation);}}>
                    <Text>Join</Text>
                  </TouchableHighlight>
                  <TouchableHighlight>
                    <Text>Decline</Text>
                  </TouchableHighlight>
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
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.handleSubmit();
            }}
          >
            <Text style={styles.btnText}>Create household</Text>
          </TouchableHighlight>
        </View>
      );
    }
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

