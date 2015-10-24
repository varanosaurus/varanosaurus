'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Entry = require('./Entry/Entry');
// var Home = require('./Home/Home');


var App = React.createClass({

  render() {
    // var Component = this.props.token
    //   ? Home
    //   : Entry;

    return this.renderEntry();
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

// before connect: App...
// after connect: App.dispatch, App.props.token
