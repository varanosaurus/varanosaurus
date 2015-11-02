'use strict';

var React = require('react-native');
var Styles = require('../../../../Styles/Styles');

var {
  View,
  Text,
  LinkingIOS,
} = React;
var {connect} = require('react-redux'); // it became dumb component now

// var ReckoningItemsDetails = require('./ReckoningItemsDetails/ReckoningItemsDetails');
// var ReckoningUsersDetails = require('./dumb/ReckoningUsersDetails');
var Actions = require('../../../../Actions/Actions');

var ReckoningDetails = React.createClass({

  componentWillMount() {
    this.props.dispatch(Actions.fetchSelectedReckoning());
  },

  render() {
    if (!this.props.selectedReckoning.users) {
      return (
        <View style={Styles.default.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={Styles.default.container}>
          <Text style={Styles.default.label}>This is a Reckoning Details View</Text>
          <View>
            {this.props.selectedReckoning.users.map((userData) => {

              return (
                <View>
                  <Text style={Styles.default.label}>{userData.username} contributed ${userData.userToReckoning.contribution} to the total {this.getOwedText(userData.userToReckoning.debt)}</Text>
                </View>
              );

            })}
          </View>
          <Text onPress={() => LinkingIOS.openURL(
            'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=pencil'
            )}>
            Amazon
          </Text>
        </View>
      );
    }
    // switch (this.props.reckoningsDetailsMode) {
    //   case 'items':
    //     return this.renderItemsDetails();
    //   case 'users':
    //     return this.renderUserDetails();
    //   default:
    //     return this.renderItemsDetails();
    // }
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

  // renderItemsDetails() {
  //   return (
  //     <ReckoningItemsDetails
  //       /* TODO: pass prop? */
  //       items={this.props.reckoning}
  //       onSelect={this.goToItemsDetailsView}
  //     />
  //   );
  // },

  // renderUsersDetails() {
  //   return (
  //     <ReckoningUsersDetails
  //       /* TODO: pass prop? */
  //       figures={this.props.reckoning.userFigures}
  //     />
  //   );
  // },

  // goToItemsDetailsView() {
  //   this.props.dispatch(Actions.setReckoningDetailsMode('items'));
  // },

  // goToUsersDetailsView() {
  //   this.props.dispatch(Actions.setReckoningDetailsMode('users'));
  // },

});

function select(state) {
  return {
    selectedReckoning: state.data.selectedReckoning,
  };
}

module.exports = connect(select)(ReckoningDetails);
