'use strict';

var React = require('react-native');

var {connect} = require('react-redux');

var Actions = require('../../Services/Actions');
var Styles = require('../../Styles/Styles');

var ReckoningTabBar = require('../Dumb/TabBar');

var {
  View,
  Text,
} = React;

var ReckoningDetails = React.createClass({

  componentWillMount() {
    this.props.dispatch(Actions.fetchSelectedReckoning());
  },

  render() {
    if (!this.props.selectedReckoning) {
      return (
        <View style={Styles.default.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      console.log('in reckdeets, selectedReckoning is: ', this.props.selectedReckoning);
      return <ReckoningTabBar
                selectedTab={this.props.reckoningDetailsMode}
                reckoning={this.props.selectedReckoning}
                gotoTotals={this.gotoTotals}
                gotoPayments={this.gotoPayments}
              />;
    }
  },

  gotoTotals() {
    this.props.dispatch(Actions.setReckoningDetailsMode('totals'));
  },

  gotoPayments() {
    this.props.dispatch(Actions.setReckoningDetailsMode('payments'));
  },

});

function select(state) {
  return {
    reckoningDetailsMode: state.uiMode.reckoningDetailsMode,
    selectedReckoning: state.data.selectedReckoning,
  };
}

module.exports = connect(select)(ReckoningDetails);
