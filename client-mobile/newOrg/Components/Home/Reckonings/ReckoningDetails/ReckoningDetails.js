'use strict';

var React = require('react-native');

var Styles = require('../../../../Styles/Styles');

var ReckoningTabBar = require('./dumb/TabBar');

var {
  View,
  Text,
} = React;

var ReckoningDetails = React.createClass({

  componentWillMount() {
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
                gotoTotals={this.props.gotoTotals}
                gotoPayments={this.props.gotoPayments}
              />;
    }
  },

});

module.exports = ReckoningDetails;
