'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Entry = require('./Entry/Entry');
var Home = require('./Home/Home');

var App = React.createClass({

  componentWillReceiveProps() {
    this.render();
  },

  render() {
    switch (this.props.token == '') {
    case true:
      return this.renderEntry();
    case false:
      return this.renderHome();
    default:
      return this.renderEntry();
    }
  },

  renderEntry() {
    return <Entry />;
  },

  renderHome() {
    return <Home />;
  },

});

function select(state) {
  return {token: state.token};
}

module.exports = connect(select)(App);
