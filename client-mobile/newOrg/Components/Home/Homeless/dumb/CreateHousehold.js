'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} = React;

var CreateHousehold = React.createClass({
  getInitialState: function() {
    return ({
       householdName: '',
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Create household name'
          onChangeText={(householdName) => this.setState({householdName: householdName})}
          value={this.state.householdName}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            this.handleSubmit;
            this.props.gotoRoommateInvitations;
          }}
        >
          <Text style={styles.btnText}>Make household</Text>
        </TouchableHighlight>
      </View>
    );
  },

  handleSubmit() {
    var household = this.state.householdName;
    this.props.submit(household);
  },

});

module.exports = CreateHousehold;

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
