// props: users: [{username: string, userToReckoning: {contribution: decimal, debt: decimal}}];
'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');

var {
  View,
  Text,
  Image,
} = React;

var UserTotals = React.createClass({

  render() {

    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: Styles.patternURI}}
          style={Styles.background.belowNavbarArea}>
          <View style={Styles.list.container}>
            {this.props.users.map((userData, i) => {

              return (
                <View key={i}>
                  <Text style={Styles.default.label}>{userData.username} </Text>
                  <Text style={Styles.default.label}>contributed ${centsToPriceString(userData.userToReckoning.contribution)} to the total </Text>
                  {this.getOwedText(userData.userToReckoning.debt)}
                </View>
              );

            })}
          </View>
        </Image>
      </View>
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

module.exports = UserTotals;

function centsToPriceString(cents) {
  return cents.toString().replace(/(\d{2})$/, '.$1');
}
