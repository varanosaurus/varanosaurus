// props: users: [{username: string, userToReckoning: {contribution: decimal, debt: decimal}}];
'use strict';

var React = require('react-native');
var Styles = require('../../../../../Styles/Styles');


var {
  View,
  ScrollView,
  Text,
} = React;

var UsersDetails = React.createClass({

  render() {

    return (
      <ScrollView style={Styles.default.container}>
        {this.props.users.map((userData) => {

          return (
            <View>
              <Text style={Styles.default.label}>{userData.username} </Text>
              <Text style={Styles.default.label}>contributed ${centsToPriceString(userData.userToReckoning.contribution)} to the total </Text>
              {this.getOwedText(userData.userToReckoning.debt)}
            </View>
          );

        })}
      </ScrollView>
    );

  },

  getOwedText(debt) {
    if (debt > 0) {
      return <Text style={Styles.default.label}>and owes ${centsToPriceString(debt)}</Text>;
    } else if (debt < 0) {
      return <Text style={Styles.default.label}>and is owed ${centsToPriceString(Math.abs(debt))}</Text>;
    } else {
      return <Text style={Styles.default.label}>and is square!</Text>;
    }
  },

});

module.exports = UsersDetails;

function centsToPriceString(cents) {
  return cents.toString().replace(/(\d{2})$/, '.$1');
}
