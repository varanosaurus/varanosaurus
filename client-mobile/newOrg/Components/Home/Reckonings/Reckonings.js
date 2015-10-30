'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var Actions = require('../../../Actions/Actions');
var Routes = require('../../../Services/Routes');

var ReckoningList = require('./dumb/ReckoningList');

var Reckoning = React.createClass({

  componentWillMount() {
    this.props.dispatch(Actions.fetchReckoningLists());
  },

  render() {
    return this.renderList();
    // switch (this.props.reckoningsViewMode) {
    //   case 'list':
    //     return this.renderList();
    //   case 'details':
    //     return this.renderDetails();
    //   default:
    //     return this.renderList();
    // }
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

  // renderDetails() {
  //   var reckoning;
  //   this.props.reckonings.forEach((dataReckoning) => {
  //     if (dataReckoning.id === this.props.selectedReckoningId.id) {
  //       reckoning = dataReckoning;
  //     }
  //   });
  //   return (
  //     <ReckoningDetails
  //       reckoning={reckoning}
  //     />
  //   );
  // },

  // handleSelect(data) {
  //   this.dispatch(Actions.selectReckoning(data));
  // },

  gotoReckoningDetailsView(reckoning) {
    this.props.dispatch(Actions.selectReckoning(reckoning));
    // this.props.dispatch(Actions.setReckoningsViewMode('details'));
    this.props.navigator.push(Routes.reckoningDetailsView);
  },

});

function select(state) {
  return {
    reckoningsViewMode: state.uiMode.reckoningsViewMode,
    reckonings: state.data.reckonings,
    selectedReckoningId: state.uiMode.selectedReckoningId,
  };
}

module.exports = connect(select)(Reckoning);
