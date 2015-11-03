'use strict';

var React = require('react-native');
var Styles = require('../../../../../Styles/Styles');

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
      price: 0,
      error: null,
    };
  },

  render() {
    return (
      <View style={Styles.default.container}>
        <Text style={Styles.default.textboxLabel}>Enter a Product</Text>
        <TextInput
          style={Styles.default.textbox}
          placeholder='Write a name of a product'
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
        />
        <Text style={Styles.default.textboxLabel}>Leave a Memo</Text>
        <TextInput
          style={Styles.default.textbox}
          placeholder='Write additional description'
          onChangeText={(details) => this.setState({details})}
          value={this.state.details}
        />
        <Text style={Styles.default.alreadyBought}>Already bought?</Text>
        <SwitchIOS
          style={{margin: 10}}
          onValueChange={(bought) => this.setState({bought})}
          value={this.state.bought} />
        {(() => {
            if (this.state.bought) {
              return (
                <View>
                <Text style={Styles.default.textboxLabel}>Enter a Price</Text>
                <TextInput
                  style={Styles.default.textbox}
                  placeholder='Price'
                  keyboardType='decimal-pad'
                  onChangeText={(price) => this.setState({price})}
                  value={this.state.price}
                />
                </View>);
            }
                })()}
        <Button style={Styles.default.btn} onPress={this.handleSubmit}>Add item</Button>
        {(() => {
          if (this.state.error !== null) {
            return <Text>{this.state.error}</Text>;
          } else if (this.props.error !== null) {
            return <Text>{this.props.error}</Text>;
          }
        })()}
      </View>
    );

  },

  handleSubmit() {
    if (this.state.description === '') {
      return this.setState({error: 'Please enter a short description of the item.'});
    } else {
      this.setState({error: null});
      this.props.handleSubmit({
        ...this.state,
        price: parseInt(this.state.price * 100, 10),
      });
    }
  },

});

module.exports = ItemAddView;
