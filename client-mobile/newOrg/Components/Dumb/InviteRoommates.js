'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Text,
  TextInput,
  Image,
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
      <View style={{flex: 1}}>
        <Image
          source={{uri: Styles.patternURI}}
          style={Styles.background.belowNavbarArea}>
          <View style={Styles.list.container}>
            <View style={{marginTop: 30}}>
            </View>
            <TextInput
              style={Styles.input.textboxField}
              keyboardType='default'
              placeholder="roommate's username"
              onChangeText={(input) => this.setState({input: input})}
              value={this.state.input}
            />
            <Text style={Styles.alert.error}>{this.state.error}</Text>
            <Button onPress={this.submitRoommate} style={Styles.btn.btn}>Invite Roommate</Button>

            <Text>Pending invitations to:</Text>
            {
              this.state.inputField.map(function(roommateUsername, i) {
                return (
                  <View key={i}>
                    <Text>{roommateUsername}</Text>
                  </View>
                );
              })
            }
          </View>
      </Image>
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

