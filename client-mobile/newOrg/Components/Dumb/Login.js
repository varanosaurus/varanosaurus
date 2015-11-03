'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Foundation');

var {
  View,
  Text,
  TextInput,
} = React;

var Login = React.createClass({

  getInitialState() {
    return ({
       username: '',
       password: '',
    });
  },

  render() {
    return (
          <View style={Styles.default.container}>
          <Text style={Styles.default.title}>Knead</Text>
          <Text style={Styles.default.subheading}>Happy roommates!</Text>
          <Text style={{textAlign: 'center'}}>
            <Icon name='home' size={100} color="327CCB" />
          </Text>
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
            Log in
          </Button>
          <Text style={Styles.alert.info}>Don't have an account?</Text>
          <Button style={Styles.btn.btn} onPress={this.props.gotoSignup}>
            Sign Up
          </Button>
        </View>);
  },

  handleSubmit() {
    var data = {username: this.state.username, password: this.state.password};
    this.props.submit(data);
  },

});

module.exports = Login;
