'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Login = require('./dumb/Login');
var Signup = require('./dumb/Signup');

var Entry = React.createClass({

  render() {
    return this.props.entryMode === 'Signup'
      ? this.renderSignup()
      : this.renderLogin();
  },

  renderLogin() {
    return (
      <Login
          submit={this.handleLogin}
          gotoSignup={this.gotoSignup}
      />
    );
  },

  renderSignup() {
    return (
      <Signup
        submit={this.handleSignup}
        gotoLogin={this.gotoLogin}
      />
    );
  },

  handleLogin(/*TODO: payload*/) {
    // dispatch action to store causing verification of user input
    this.props.dispatch(/*TODO: LOGIN*/);
  },

  handleSignup(/*TODO: payload*/) {
    // dispatch action to store causing creation of new user
    this.props.dispatch(/*TODO: SIGNUP*/);
  },

  gotoLogin() {
    // dispatch action to store to change
    // state.entryMode -> 'Login'
    this.props.dispatch(/*TODO: ENTRYMODE_LOGIN*/);
  },

  gotoSignup() {
    // dispatch action to store to change
    // state.entryMode -> 'Signup'
    this.props.dispatch(/*TODO: ENTRYMODE_SIGNUP*/);
  },

});

function select(state) {
  // TODO: set default for state.entryMode
 return {entryMode: state.entryMode};
}

module.exports = connect(select)(Entry);
