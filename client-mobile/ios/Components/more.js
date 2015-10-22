'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} = React;

var More = React.createClass({

  editProfile: function() {
    this.props.SelectProfile();
  },

  editRoommates: function() {
    this.props.SelectRoommates();
  },


  editNotifications: function() {
    console.log("notifications")
  },

  logout: function() {
    console.log("logout")
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.editProfile}
        >
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.button}
          onPress={this.editRoommates}
        >
          <Text style={styles.btnText}>Edit Roommates</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.button}
          onPress={this.editNotifications}
        >
          <Text style={styles.btnText}>Edit Notifications</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.button}
          onPress={this.logout}
        >
          <Text style={styles.btnText}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#EDEBE8',
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnText: {
    fontSize: 18,
  },
});

module.exports = More;
