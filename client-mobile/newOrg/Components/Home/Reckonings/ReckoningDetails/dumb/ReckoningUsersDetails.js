// TODO: display breakdown of contribution and what's owed to whom
// contains business logic for calculating what's owed?
// props: figures: [{username: string, contribution: decimal, debt: decimal}];
'use strict';

var React = require('react-native');

var {
  View,
  Text,
  // Stylesheet,
} = React;

var UsersDetails = React.createClass({

  render() {

    return (
      <View>
        {this.props.figures.map((userData) => {

          return (
            <View>
              <Text>{userData.username} </Text>
              <Text>contributed ${userData.contribution} to the total </Text>
              {this.getOwedText(userData.debt)}
            </View>
          );

        })}
      </View>
    );

  },

  getOwedText(debt) {
    if (debt > 0) {
      return <Text>and owes ${debt}</Text>;
    } else if (debt < 0) {
      return <Text>and is owed ${Math.abs(debt)}</Text>;
    } else {
      return <Text>and is square!</Text>;
    }
  },

});

module.exports = UsersDetails;
