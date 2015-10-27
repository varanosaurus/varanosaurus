'use strict';

var React = require('react-native');

var {
  // StyleSheet,
  View,
  Text,
  TouchableHighlight,
} = React;

var Invitations = React.createClass({
  getInitialState() {
    return ({
      invitations: this.props.invitations,
      acceptedInvitation: "",
      declinedInvitation: "",
    });
  },

  render() {
    var invitations = this.state.invitations;
    return (
      <View>
        {
          invitations.map(function(invitation) {
            return (<Text>You have been invited to the {invitation.householdName} household!</Text>
                    <TouchableHighlight onPress={}>
                      <Text>Join</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={}>
                      <Text>Decline</Text>
                    </TouchableHighlight>
                   );
          }) 
        }
        <Text> ----- OR----- </Text>
        <TouchableHighlight
          onPress={this.props.submit}
        >
          <Text>Create Household</Text>
        </TouchableHighlight>
      </View>
    );
  },

  joinHousehold() {
    this.props.join(invitation)
  },

});

module.exports = Invitations;
