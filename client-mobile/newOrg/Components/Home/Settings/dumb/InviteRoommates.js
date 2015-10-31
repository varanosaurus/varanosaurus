'use strict';

var React = require('react-native');
var Button = require('react-native-button');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
} = React;

var InviteRoommates = React.createClass({

  getInitialState() {
    return ({
      inputField: [],
    });
  },

  componentWillUnmount() {
    this.props.resetSettingsViewMode();
  },

  render() {
    return (
      <View style={styles.mainSection}>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder="roommate's username"
          onChangeText={(input) => this.setState({input: input})}
          value={this.state.input}
        />
        <Text style={styles.errorHandling}>{this.state.error}</Text>
        <Button onPress={this.submitRoommate} style={styles.btn}>Invite Roommate</Button>

        <Text>Pending invitations to:</Text>
        {
          this.state.inputField.map(function(roommateUsername) {
            return (
              <View>
                <Text>{roommateUsername}</Text>
              </View>
            );
          })
        }
      </View>
    );
  },

  submitRoommate() {
    var username = this.state.input;
    if (this.state.input === undefined) {
      this.setState({error: 'Please add a roommate before submitting'});
    } else {
      this.state.inputField.push(username);
      this.setState({input: undefined, error: ''});
      this.props.handleInviteRoommates(username);
    }
  },

});

module.exports = InviteRoommates;

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 39,
    color: 'gray',
  },
  itemName: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: '500',
  },
  inputLine: {
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    flex: 2,
    borderColor: 'gray',
    borderWidth: 1,

  },
  mainSection: {
    flex: 1,
    marginTop: 64,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  btn: {
    margin: 10,
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
    borderRadius: 20,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorHandling: {
    color: 'red',
  },
});
