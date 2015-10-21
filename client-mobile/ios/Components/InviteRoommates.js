var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  TextInput,
  View,
  Text,
} = React;

var InviteRoommates = React.createClass({
  submitRoommates: function() {
    // the below code is a "hack" but react-native doesn't currently support optimally otherwise
    // this.props.navigator.popToRoute(this.props.navigator.getCurrentRoutes()[1]);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text>INVITE ROOMMATES</Text>
        <TextInput style={styles.input} placeholder="roommate's email address"/>
        <TextInput style={styles.input} placeholder="roommate's email address"/>
        <TextInput style={styles.input} placeholder="roommate's email address"/>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.submitRoommates()}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  button: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
  },
  btnText: {
    fontSize: 18,
    color: 'white'
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  }
});

module.exports = InviteRoommates;
