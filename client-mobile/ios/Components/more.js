'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} = React;

var More = React.createClass({

  select: function() {
    console.log(this.props);
    this.props.onSelectEdit();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.select()}
        >
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.btnText}>Edit Roommates</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.btnText}>Edit Notifications</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
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
