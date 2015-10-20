'use strict';

var React = require('react-native');
var Root = require('./ios/Components/Root');
var ItemList = require('./ios/Components/ItemList'); // KC

var {
  AppRegistry,
  StyleSheet,
  // Navigator,
  NavigatorIOS, // KC
} = React;

var Knead = React.createClass({

  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Knead',
          component: Root
        }}
      />
    );
  }

  // renderScene: function(route, navigator) {
  //   switch (route.id) {
  //     case 'Sign up / Login':
  //       return <Root navigator={navigator}/>
  //     case 'Sign up':
  //       return <SignUp navigator={navigator}/>
  //     case 'Log in':
  //       return <LogIn navigator={navigator}/>
  //     case 'Not invited':
  //       return <NotInvitedToHH navigator={navigator}/>
  //     case 'Invited':
  //       return <InvitedToHH navigator={navigator}/>
  //     case 'Create new household':
  //       return <CreateNewHH navigator={navigator}/>
  //   }
  // },
  // render: function() {
  //   return (
  //     <Navigator
  //       style={styles.container}
  //       initialRoute={{
  //         index: 0,
  //         id: 'Sign up / Login'
  //       }}
  //       renderScene={this.renderScene}
  //     />
  //   );
  // }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('Knead', () => Knead);
