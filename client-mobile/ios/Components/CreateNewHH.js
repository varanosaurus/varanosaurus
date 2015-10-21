var React = require('react-native');
var InviteRoommates = require('./InviteRoommates');

var {
  StyleSheet,
  TouchableHighlight,
  TextInput,
  View,
  Text,
} = React;

var CreateNewHH = React.createClass({
  getInitialState: function() {
    return ({
       householdName: '',
       error: '',
    });
  },

  inviteRoommates: function() {
    if (this.state.householdName.length === 0) {
      this.setState({
        error: 'Please provide a household name',
      });
    } else {
      this.props.navigator.push({
        title: 'Invite Roommates',
        component: InviteRoommates,
      });
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Create household name'
          onChangeText={(householdName) => this.setState({householdName: householdName})}
          value={this.state.householdName}
        />
        <Text style={styles.errorHandling}>{this.state.error}</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.inviteRoommates()}
        >
          <Text style={styles.btnText}>Make household</Text>
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
  button: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 2,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
  errorHandling: {
    color: 'red',
  },
});


module.exports = CreateNewHH;
