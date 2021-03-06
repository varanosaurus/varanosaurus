'use strict';

//TODO: refactor this to only have the add household part here once

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Text,
  TextInput,
  Image,
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
      <View style={{flex: 1}}>
        <Image
          source={{uri: Styles.patternURI}}
          style={Styles.background.belowNavbarArea}>
          <View style={Styles.list.container}>
            <Text>Hey there! If you think you've already been invited to a household, make sure to check in with your roommate.</Text>
            <Text style={Styles.alert.info}> ----- OR ----- </Text>
            <Text style={Styles.alert.info}> Create a household </Text>
            <TextInput
              style={Styles.input.textboxField}
              keyboardType='default'
              placeholder="What's your household name?"
              onChangeText={(householdName) => this.setState({householdName: householdName})}
              value={this.state.householdName}
              placeholderTextColor={Styles.placeholderColor}
            />
            <Button
              style={Styles.btn.btn}
              onPress={this.handleSubmit} >
              Create household
            </Button>
          </View>
        </Image>
      </View>
      );
    } else {
      return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: Styles.patternURI}}
          style={Styles.background.belowNavbarArea}>
          <View style={Styles.list.container}>
            {
              this.props.invitations.map(function(invitation) {
                return (
                  <View>
                    <Text key={invitation.householdName}>Hey there! Looks like you've been invited to the {invitation.householdName} household!</Text>
                    <Button
                      style={Styles.btn.btn}
                      onPress={self.props.respondToInvitation('accepted', invitation.id)}>
                      Join
                    </Button>
                    <Button
                      style={Styles.btn.accentBtn}
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
              style={Styles.input.textboxField}
              keyboardType='default'
              placeholder="What's your household name?"
              onChangeText={(householdName) => this.setState({householdName: householdName})}
              value={this.state.householdName}
            />
            <Button
              style={Styles.btn.btn}
              onPress={this.handleSubmit} >
              Create household
            </Button>
          </View>
        </Image>
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
