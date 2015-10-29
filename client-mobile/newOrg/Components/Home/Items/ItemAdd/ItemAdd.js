'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../../../Actions/Actions');
var Network = require('../../../../Services/Network');

var ItemAdd = React.createClass({


  handleSubmit(data) {

  },

});

function select() {
  return {};
}

module.exports = connect(select)(ItemAdd);
