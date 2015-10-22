'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} = React;

var Roommates = React.createClass({
  getInitialState: function() {
    return ({
      inputField: [true],
    });
  },
  addRoommate: function() {
    this.state.inputField.push(true);
    this.setState(this.state.inputField);
  },
  submitRoommates: function() {
    //Note: need to write better logic for error handling. right now if the user deletes all the text in the input fields, they won't get the error
    if (this.state.input === undefined) {
      this.setState({error: 'Please add at least one roommate before submitting'});
    }
  },
  render: function() {
    var inputFields = this.state.inputField;
    var self = this;
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.remove}>Remove Roommate 1</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}>
          <Text style={styles.remove}>Remove Roommate 2</Text>
        </TouchableHighlight>

        {inputFields.map(function() {
          return (<TextInput
                      style={styles.input}
                      keyboardType='default'
                      placeholder="roommate's email address"
                      onChangeText={(input) => self.setState({input: input})}
                  />);
          })
        }

        <Text style={styles.hyperLink} onPress={this.addRoommate}>Invite more</Text>
        <Text style={styles.errorHandling}>{this.state.error}</Text>

        <TouchableHighlight style={styles.button} onPress={() => this.submitRoommates()}>
          <Text style={styles.btnText}>Invite Roommates</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  hyperLink: {
    color: 'blue',
  },
  button: {
    backgroundColor: '#EDEBE8',
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnText: {
    fontSize: 18,
  },
  remove: {
    color: 'red',
  },
  errorHandling: {
    color: 'red',
  },
});

module.exports = Roommates;
