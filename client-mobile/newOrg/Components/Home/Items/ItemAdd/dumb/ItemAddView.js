'use strict';

var React = require('react-native');

var Button = require('react-native-button');

var {
  View,
  Text,
  TextInput,
  SwitchIOS,
  StyleSheet,
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
      <View style={styles.mainSection}>
        <Text>Enter a short description:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
        />
        <Text>Enter any additional details:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(details) => this.setState({details})}
          value={this.state.details}
        />
        <SwitchIOS onValueChange={(bought) => this.setState({bought})} value={this.state.bought} />
        <Text>Already bought</Text>
        {(() => {
            if (this.state.bought) {
              return (
                <View>
                <Text>Price:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType='decimal-pad'
                  onChangeText={(price) => this.setState({price})}
                  value={this.state.price}
                />
                </View>);
            }
                })()}
        <Button style={styles.btn} onPress={this.handleSubmit}>Add item</Button>
      </View>
    );

  },

  handleSubmit() {
    this.props.handleSubmit(this.state);
  },

});

module.exports = ItemAddView;

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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  btn: {
    margin: 10,
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
    borderRadius: 20,
  },
});
