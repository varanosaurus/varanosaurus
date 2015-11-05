'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../Services/Actions');
var Routes = require('../../Services/Routes');

var ReckoningList = require('../Dumb/ReckoningList');

var Reckoning = React.createClass({

  componentWillMount() {
    this.props.dispatch(Actions.fetchReckoningLists());
  },

  render() {
    return this.renderList();
  },

  renderList() {
    return (
      <ReckoningList
        reckonings={this.props.reckonings}
        //handleSelect={this.handleSelect}
        gotoReckoningDetailsView={this.gotoReckoningDetailsView}
      />
    );
  },

  gotoReckoningDetailsView(reckoning) {
    this.props.dispatch(Actions.selectReckoning(reckoning));
    this.props.dispatch(Actions.fetchSelectedReckoning())
      .then(() => {
        this.props.navigator.push(Routes.reckoningDetailsView);
      });
  },

});

function select(state) {
  return {
    reckoningsViewMode: state.uiMode.reckoningsViewMode,
    reckonings: state.data.reckonings,
    selectedReckoning: state.data.selectedReckoning,
    reckoningDetailsMode: state.uiMode.reckoningDetailsMode,
  };
}

module.exports = connect(select)(Reckoning);
