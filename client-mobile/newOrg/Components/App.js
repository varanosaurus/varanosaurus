'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Entry = require('./Entry/Entry');
// var Home = require('./Home/Home');
var {Text} = React;

var App = React.createClass({

  render() {
    switch (this.props.token == null) {
    case true:
      return this.renderEntry();
    case false:
      return this.renderHome();
    default:
      return this.renderEntry();
    }
    // return this.props.token
    //   ? this.renderHome()
    //   : this.renderEntry();
  },

  renderEntry() {
    return <Entry />;
  },

  renderHome() {
    return <Text>Hello world</Text>;
    // return <Home />;
  },

});

function select(state) {
  return {token: state.token};
}

module.exports = connect(select)(App);

// before connect: App...
// after connect: App.dispatch, App.props.token
