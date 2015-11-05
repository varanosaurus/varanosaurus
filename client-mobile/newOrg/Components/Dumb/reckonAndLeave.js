'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Text,
  Image,
} = React;

var ReckonAndLeave = React.createClass({

  render() {
    if (this.props.selectedReckoning != null) {
      return this.renderReckoningStats();
    } else {
      return this.renderGoodToGo();
    }
  },

  renderReckoningStats() {
    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: Styles.patternURI}}
          style={Styles.background.belowNavbarArea}>
          <View style={Styles.list.container}>
            <Text>
              Ok, {this.props.username}. Before you go, we crunched your numbers.
              This month, you contributed ${centsToPriceString(this.props.contribution)} {this.getDebtText()}
            </Text>
            <Button style={Styles.btn.btn} onPress={this.props.leaveHousehold}>
              Got it. Get me outta here!
            </Button>
          </View>
        </Image>
      </View>
    );
  },

  renderGoodToGo() {
    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: Styles.patternURI}}
          style={Styles.background.belowNavbarArea}>
          <View style={Styles.list.container}>
            <Text>Knead checked, and you're good to go!</Text>
            <Button style={Styles.btn.btn} onPress={this.props.leaveHousehold}>
              Later!
            </Button>
          </View>
        </Image>
      </View>
      );
  },

  getDebtText() {
    if (this.props.debt > 0) {
      return (
        <Text>and you'll owe your roommates ${centsToPriceString(this.props.debt)}.</Text>
        );
    } else {
      return (
        <Text>and your roommates still owe you ${centsToPriceString(Math.abs(this.props.debt))}.</Text>
        );
    }
  },

});

module.exports = ReckonAndLeave;

function centsToPriceString(cents) {
  return cents.toString().replace(/(\d{2})$/, '.$1');
}

