'use strict';

var React = require('react-native');

var Button = require('react-native-button');

var {
  View,
  Text,
  TextInput,
  SwitchIOS,
} = React;

// TODO: input validation
var ItemAddView = React.createClass({

  getInitialState() {
    return {
      description: '',
      details: '',
      bought: false,
      price: 0.0,
    };
  },

  render() {
    return (
      <View>
        <Text>Enter a short description:</Text>
        <TextInput
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
        />
        <Text>Enter any additional details:</Text>
        <TextInput
          onChangeText={(details) => this.setState({details})}
          value={this.state.details}
        />
        <SwitchIOS onValueChange={(bought) => this.setState({bought})} value={this.state.bought} />
        <Text>Already bought</Text>
        <Button onPress={this.handleSubmit}>Add item</Button>
      </View>
    );

  },


});

module.exports = ItemAddView;
