var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  TextInput,
  View,
  Text,
} = React;

var InviteRoommates = React.createClass({
  getInitialState: function() {
    return ({
      inputField: 2,
    })
  },
  addRoommate: function() {
    this.state.inputField++;
  },
  submitRoommates: function() {
    // the below code is a "hack" but react-native doesn't currently support optimally otherwise
    // this.props.navigator.popToRoute(this.props.navigator.getCurrentRoutes()[1]);
  },
  render: function() {
    var inputFields = this.state.inputField;
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} keyboardType='default' placeholder="roommate's email address"/>
        <TextInput style={styles.input} keyboardType='default' placeholder="roommate's email address"/>
        <TextInput style={styles.input} keyboardType='default' placeholder="roommate's email address"/>
        {inputFields.forEach(function(inputField) {
          return <TextInput style={styles.input} keyboardType='default' placeholder="roommate's email address"/>
        })}
        <Text 
          style={styles.hyperLink}
          onPress={() => this.addRoommate}
        >Invite more</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.submitRoommates()}
        >
          <Text style={styles.btnText}>Invite Roommates</Text>
        </TouchableHighlight>
      </View>
    );
  },
});

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
  hyperLink: {
    color: 'blue',
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
    color: 'white',
  },
});

module.exports = InviteRoommates;
