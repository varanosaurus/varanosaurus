'use strict';

var React = require('react-native');
var {createStore, applyMiddleware} = require('redux');
var {Provider} = require('react-redux');
var thunk = require('redux-thunk');


var App = require('./newOrg/Components/App');
var appReducer = require('./newOrg/Reducers/appReducer');

var {
  AppRegistry,
//   StyleSheet,
//   NavigatorIOS,
} = React;

var store = applyMiddleware(thunk)(createStore)(appReducer);

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
