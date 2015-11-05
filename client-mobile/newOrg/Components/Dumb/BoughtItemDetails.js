'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
// var Icon = require('react-native-vector-icons/Ionicons');

var {
  StyleSheet,
  View,
  Text,
} = React;

var BoughtItemDetails = React.createClass({

  render() {
    return (
      <View style={Styles.default.container}>
        <Text style={Styles.page.boughtTitle} style={stylesheet.title}>{this.props.item.description}</Text>
        <Text style={Styles.page.boughtBy} style={stylesheet.requestBoughtBy}>Requested by: {this.props.creator.username}</Text>
        <Text style={Styles.page.boughtBy} style={stylesheet.requestBoughtBy}>Bought by: {this.props.creator.username}</Text>
        <View style={stylesheet.priceBox}>
          <Text style={stylesheet.priceText}>Bought for</Text>
          <Text style={Styles.page.boughtDollar} style={stylesheet.priceAmount}>${centsToPriceString(this.props.item.price)}</Text>
        </View>
        <Text style={Styles.page.boughtDetails}>Details: {this.props.item.details}</Text>
      </View>
    );
  },

});

function centsToPriceString(cents) {
  return cents.toString().replace(/(\d{2})$/, '.$1');
}

module.exports = BoughtItemDetails;

var stylesheet = StyleSheet.create({
  title: {
    backgroundColor: '3d4e5b',
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 37,
    color: 'white',
    textAlign: 'center',
  },
  requestBoughtBy: {
    color: '3d4e5b',
    textAlign: 'center',
    paddingTop: 15,
  },
  priceBox: {
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 100,
    marginRight: 100,
    height: 150,
    borderRadius: 5,
    backgroundColor: '#cc5251',
    borderColor: '#cc5251',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
  },
  priceText: {
    paddingTop: 15,
    paddingBottom: 9,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  priceAmount: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },

});

