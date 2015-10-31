'use strict';

var React = require('react-native');
var Button = require('react-native-button');

var {
  StyleSheet,
  View,
  // Text,
} = React;

var SettingsOptions = React.createClass({
  render() {
    return (
      <View style={styles.mainSection}>
        <Button onPress={this.props.logout} style={styles.btn}>
          Logout
        </Button>
        <Button onPress={this.props.gotoInviteRoommates} style={styles.btn}>
          Invite Roommates
        </Button>
      </View>
    );
  },

});

module.exports = SettingsOptions;

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
});
