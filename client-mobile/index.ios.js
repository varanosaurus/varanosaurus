'use strict';

var React = require('react-native');
var {createStore} = require('redux');
var {Provider} = require('react-redux');

var App = require('./newOrg/Components/App');

var {
  AppRegistry,
//   StyleSheet,
//   NavigatorIOS,
} = React;

var store = createStore((state) => state, {entryMode: 'Login', token: null});

var Knead = React.createClass({

  render() {
    return (
      <Provider store={store}>
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
