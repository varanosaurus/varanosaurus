'use strict';

var React = require('react-native');
var {Provider} = require('react-redux');

var App = require('./newOrg/Components/App');
var Store = require('./newOrg/Services/Store');

var {
  AppRegistry,
//   StyleSheet,
//   NavigatorIOS,
} = React;

var Knead = React.createClass({

  render() {
    return (
      <Provider store={Store}>
        <App />
      </Provider>
    );
  },

});

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });

AppRegistry.registerComponent('Knead', () => Knead);
