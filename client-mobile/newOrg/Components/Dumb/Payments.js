// props: {users: {User}, payments: [{toUserId: int, fromUserId: int, amount: int}]}
'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Text,
  LinkingIOS,
  Image,
} = React;

var Payments = React.createClass({

  render() {
    return (
      <Image
        source={{uri: Styles.patternURI}}
        style={Styles.background.belowNavbarArea}>
      <View style={Styles.reckoningPayments.container}>
      <ScrollView style={Styles.reckoningPayments.list}>
        {this.props.payments.map((paymentData, i) => {

          var toUsername = paymentData.toUser.username;
          var fromUsername = paymentData.fromUser.username;

          return (
            <View key={i}>
              <Text style={Styles.default.label}>
              {fromUsername} owes {toUsername} ${centsToPriceString(paymentData.amount)}
              </Text>

            </View>
            );

        })}
      </ScrollView>
      <Button onPress={this.settle} style={[Styles.btn.btn, Styles.reckoningPayments.button]}>Pay or Request via Venmo</Button>
      </View>
      </Image>
      );
  },

  settle() {
    LinkingIOS.openURL(
      'venmo://payments'
    );
  },

});

module.exports = Payments;

// function mapUser(users, id) {
//   var i;

//   for (i = 0; i < users.length; i++) {
//     if (users[i].id === id) {
//       return users[i].username;
//     }
//   }
// }

function centsToPriceString(cents) {
  return cents.toString().replace(/(\d{2})$/, '.$1');
}
