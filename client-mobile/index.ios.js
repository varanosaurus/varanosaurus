'use strict';

var React = require('react-native');
var Root = require('./ios/Components/Root');

var {
  AppRegistry,
  StyleSheet,
  Navigator,
} = React;



var Knead = React.createClass({
  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          name: 'Sign up / Login',
          index: 0,
          title: 'Sign up / Login'
          // component: TabView,
          
        }}
        renderScene={(route, navigator) => 
          <Root
            name={route.name}
          />
          // onForward={() => {
          //   var next = route.index + 1;
          //   navigator.push({
          //     name: ''
          //   })
          // }}
        }
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('Knead', () => Knead);
