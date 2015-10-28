'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

// var Actions = require('../../Actions/Actions');

var Homeless = require('./Homeless/Homeless');
// var HomeTab = require('./dumb/HomeTab');
var NavRedux = require('../NavRedux');

var Home = React.createClass({

  render() {
    return this.props.household
      ? <NavRedux />
      : <Homeless />;
  };

});

function select(state) {
  return {
    household: state.data.household,
    selectedHomeTab: state.uiMode.selectedHomeTab,
  };
}

module.exports = connect(select)(Home);
