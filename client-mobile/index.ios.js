'use strict';

var React = require('react-native');
var Root = require('./ios/Components/Root');
// var ItemList = require('./ios/Components/ItemList');
var SignUp = require('./ios/Components/SignUp');
var LogIn = require('./ios/Components/LogIn');
var NotInvitedToHH = require('./ios/Components/NotInvitedToHH');
var InvitedToHH = require('./ios/Components/InvitedToHH');
var CreateNewHH = require('./ios/Components/CreateNewHH');
var InviteRoommates = require('./ios/Components/InviteRoommates');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var Knead = React.createClass({
  renderScene: function(route, navigator) {
    switch (route.id) {
      case 'Sign up / Login':
        return <Root navigator={navigator}/>;
      case 'Sign up':
        return <SignUp navigator={navigator}/>;
      case 'Log in':
        return <LogIn navigator={navigator}/>;
      case 'Not invited':
        return <NotInvitedToHH navigator={navigator}/>;
      case 'Invited':
        return <InvitedToHH navigator={navigator}/>;
      case 'Create new household':
        return <CreateNewHH navigator={navigator}/>;
      case 'Invite roommates':
        return <InviteRoommates navigator={navigator}/>;
    }
  },
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Knead',
          component: Root,
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('Knead', () => Knead);
