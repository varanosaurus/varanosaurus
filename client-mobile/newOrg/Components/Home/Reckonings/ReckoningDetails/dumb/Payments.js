// props: {users: {User}, payments: [{toUserId: int, fromUserId: int, amount: int}]}
'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var Styles = require('../../../../../Styles/Styles');

var {
  View,
  ScrollView,
  Text,
  LinkingIOS,
} = React;

var Payments = React.createClass({

  render() {
    var users = this.props.users;

    return (
      <ScrollView style={Styles.default.container}>
        {this.props.payments.map(paymentData => {
          var toUsername = mapUser(users, paymentData.toUserId);
          var fromUsername = mapUser(users, paymentData.fromUserId);

          return (
            <View>
              <Text style={Styles.default.label}>
              {fromUsername} owes {toUsername} ${centsToPriceString(paymentData.amount)}
              </Text>
              <Button onPress={this.settle} style={Styles.default.btn}>Pay or Request via Venmo</Button>
            </View>
            );

        })}
      </ScrollView>
      );
  },

  settle() {
    LinkingIOS.openURL(
      'venmo://payments'
    );
  },

});

module.exports = Payments;

function mapUser(users, id) {
  var i;

  for (i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return users[i].username;
    }
  }
}

function centsToPriceString(cents) {
  return cents.toString().replace(/(\d{2})$/, '.$1');
}
