'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Image,
} = React;

var SettingsOptions = React.createClass({
  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: Styles.patternURI}}
          style={Styles.background.belowNavbarArea}>
          <View style={Styles.list.container}>
            <Button onPress={this.props.logout} style={Styles.btn.btn}>
              Logout
            </Button>
            <Button onPress={this.props.gotoInviteRoommates} style={Styles.btn.btn}>
              Invite Roommates
            </Button>
            <Button onPress={this.props.gotoConfirmLeave} style={Styles.btn.btn}>
              Leave Household
            </Button>
          </View>
        </Image>
      </View>
    );
  },

});

module.exports = SettingsOptions;
