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
      <Image
        source={{uri: Styles.patternURI}}
        style={Styles.background.belowNavbarArea}>
      <ScrollView style={Styles.list.container}>
        {this.props.users.map((userData, i) => {

          return (
            <View style={Styles.list.row} key={i}>
              <View style={Styles.reckoningTotals.name}>
                <Text style={[Styles.default.label, Styles.reckoningTotals.nameText]}>{userData.username} </Text>
              </View>
              <View style={Styles.reckoningTotals.numbersContainer}>

                <View style={Styles.reckoningTotals.numbers}>
                  <Text style={[Styles.default.text, Styles.reckoningTotals.contributed]}>
                    contributed <Text style={Styles.reckoningTotals.number}>${centsToPriceString(userData.userToReckoning.contribution)}</Text>
                  </Text>
                </View>

                <View style={Styles.reckoningTotals.numbers}>
                    {this.getOwedText(userData.userToReckoning.debt)}
                </View>

              </View>

            </View>
          );

        })}
      </ScrollView>
      </Image>
    );

  },

  getOwedText(debt) {
    if (debt > 0) {
      return <Text style={[Styles.default.text, Styles.reckoningTotals.owes]}>and owes <Text style={Styles.reckoningTotals.number}>${centsToPriceString(debt)}</Text></Text>;
    } else if (debt < 0) {
      return <Text style={[Styles.default.text, Styles.reckoningTotals.owed]}>and is owed <Text style={Styles.reckoningTotals.number}>${centsToPriceString(Math.abs(debt))}</Text></Text>;
    } else {
      return <Text style={Styles.default.text}>and is square!</Text>;
    }
  },

});

module.exports = UserTotals;

function centsToPriceString(cents) {
  return cents.toString().replace(/(\d{2})$/, '.$1');
}
