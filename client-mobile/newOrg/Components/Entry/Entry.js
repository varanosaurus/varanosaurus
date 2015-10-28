'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../Actions/Actions');

// var Login = require('./dumb/Login'); // KC
var Reckonings = require('../Home/Reckonings/Reckonings'); // KC
var Signup = require('./dumb/Signup');

var Entry = React.createClass({

  render() {
    return this.props.entryMode === 'signup'
      ? this.renderSignup()
      : this.renderLogin();
  },

  renderLogin() {
    return (
      <Reckonings /> // KC
      // <Login
          // submit={this.handleLogin}
          // gotoSignup={this.gotoSignup}
      // />
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

  handleLogin(data) {
    // dispatch action to store causing verification of user input
    this.props.dispatch(Actions.login(data.username, data.password));
  },

  handleSignup(data) {
    // dispatch action to store causing creation of new user
    this.props.dispatch(Actions.signup(data.username, data.password));
  },

  gotoLogin() {
    // dispatch action to store to change
    // state.entryMode -> 'login'
    this.props.dispatch(Actions.setEntryMode('login'));
  },

  gotoSignup() {
    // dispatch action to store to change
    // state.entryMode -> 'signup'
    this.props.dispatch(Actions.setEntryMode('signup'));
  },

});

function select(state) {
 return {entryMode: state.uiMode.entryMode};
}

module.exports = connect(select)(Entry);
