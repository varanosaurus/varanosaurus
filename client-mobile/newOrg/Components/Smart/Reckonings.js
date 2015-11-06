'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var TimerMixin = require('react-timer-mixin');

var Actions = require('../../Services/Actions');
var Routes = require('../../Services/Routes');

var ReckoningList = require('../Dumb/ReckoningList');


var Reckoning = React.createClass({

  mixins: [TimerMixin],

  componentWillMount() {
    var dispatch = this.props.dispatch;

    dispatch(Actions.fetchReckoningLists());

    this.setInterval(function() {
      dispatch(Actions.fetchReckoningLists());
    }, 3000);
  },

  render() {
    return this.renderList();
  },

  renderList() {
    return (
      <ReckoningList
        reckonings={this.props.reckonings}
        //handleSelect={this.handleSelect}
        canReckon={this.props.canReckon}
        reckonNow={this.reckonNow}
        reckoningRequestState={this.props.reckoningRequestState}
        gotoReckoningDetailsView={this.gotoReckoningDetailsView}
      />
    );
  },

  gotoReckoningDetailsView(reckoning) {
    if (this.props.selectedReckoningId !== reckoning.id) {
      this.props.dispatch(Actions.selectReckoning(reckoning));
      this.props.dispatch(Actions.fetchSelectedReckoning())
        .then(() => {
          this.props.navigator.push(Routes.reckoningDetailsView);
        });
    } else {
      this.props.navigator.push(Routes.reckoningDetailsView);
    }
  },

  reckonNow() {
    this.props.dispatch(Actions.initiateReckoning(false));
  },

});

function select(state) {

  return {
    reckoningsViewMode: state.uiMode.reckoningsViewMode,
    reckonings: state.data.reckonings,
    selectedReckoning: state.data.selectedReckoning,
    selectedReckoningId: state.uiMode.selectedReckoningId,
    reckoningDetailsMode: state.uiMode.reckoningDetailsMode,
    canReckon: state.data.items.bought.length ? true : false,
    reckoningRequestState: state.uiMode.reckoningRequestState,
  };
}

module.exports = connect(select)(Reckoning);
