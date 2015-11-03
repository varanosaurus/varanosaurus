'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Icon = require('react-native-vector-icons/Foundation');

var {
  View,
  Text,
} = React;

var BoughtItemDetails = React.createClass({

  render() {
    return (
      <View style={Styles.default.container}>
        <Text style={Styles.page.boughtTitle}><Icon stype={{margin: 20}} name='shopping-cart' size={50} color="327CCB" /> {this.props.item.description}</Text>
        <Text style={Styles.page.boughtBy}><Icon stype={{margin: 20}} name='torso' size={50} color="327CCB" /> Requested By: {this.props.creator.username}</Text>
        <Text style={Styles.page.boughtDetails}><Icon stype={{margin: 20}} name='pricetag-multiple' size={50} color="327CCB" /> Details: {this.props.item.details}</Text>
        <Text style={Styles.page.boughtDollar}><Icon stype={{margin: 20}} name='credit-card' size={50} color="327CCB" /> $ {centsToPriceString(this.props.item.price)}</Text>
      </View>
    );
  },

});

function centsToPriceString(cents) {
  return cents.toString().replace(/(\d{2})$/, '.$1');
}

module.exports = BoughtItemDetails;

