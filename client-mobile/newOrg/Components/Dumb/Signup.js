'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Text,
  TextInput,
} = React;

var Signup = React.createClass({

  getInitialState() {
    return ({
       username: '',
       password: '',
    });
  },

  render() {
    return (
          <View style={Styles.default.container}>
          <TextInput
            keyboardType='default'
            style={Styles.input.textboxField}
            placeholder='username'
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
          <TextInput
            keyboardType='default'
            style={Styles.input.textboxField}
            placeholder='password'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <Text style={Styles.alert.error}>{this.props.errorHandling}</Text>
          <Button style={Styles.btn.btn} onPress={this.handleSubmit}>
            Sign up
          </Button>
          <Text style={Styles.alert.info}>Already have an account?</Text>
          <Button style={Styles.btn.btn} onPress={this.props.gotoLogin}>
            Log in
          </Button>
        </View>);
  },

  handleSubmit() {
    var data = {username: this.state.username, password: this.state.password};
    this.props.submit(data);
  },

});

module.exports = Signup;
