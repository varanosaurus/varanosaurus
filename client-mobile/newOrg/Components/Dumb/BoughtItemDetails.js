'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
// var Icon = require('react-native-vector-icons/Ionicons');

var {
  View,
  Text,
  Image,
} = React;

var BoughtItemDetails = React.createClass({

  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: Styles.patternURI}}
          style={Styles.background.belowNavbarArea}>
          <View style={Styles.list.container}>
            <Text style={Styles.page.pageTitle}>{this.props.item.description}</Text>
            <Text style={Styles.page.boughtBy}>Requested by: {this.props.creator.username}</Text>
            <View style={Styles.page.priceBox}>
              <Text style={Styles.page.priceText}>Bought for</Text>
              <Text style={Styles.page.boughtDollar}>${centsToPriceString(this.props.item.price)}</Text>
            </View>
            <View style={Styles.page.boughtItemDetailsContainer}>
              <Text style={[Styles.page.boughtDetails, {textAlign: 'center', fontFamily: Styles.titleFont}]}>Memo</Text>
              <Text style={Styles.page.boughtDetails, {fontFamily: Styles.mainFont, fontSize: 18}}>{this.props.item.details}</Text>
            </View>
          </View>
        </Image>
      </View>
    );
  },

});

function centsToPriceString(cents) {
  return cents.toString().replace(/(\d{2})$/, '.$1');
}

module.exports = BoughtItemDetails;
