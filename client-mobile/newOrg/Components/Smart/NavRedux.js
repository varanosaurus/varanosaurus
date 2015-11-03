'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');

// var Actions = require('../Actions/Actions');
var Routes = require('../../Services/Routes');

var {
  Navigator,
  TouchableHighlight,
  Text,
} = React;


var NavRedux = React.createClass({

  render() {
    return (
        <Navigator
          initialRoute={Routes.hometab}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
          ref='navigator'
          navigationBar={<Navigator.NavigationBar
            style={Styles.navbar.container}
            routeMapper={this.routeMapper} />}
        />
      );
  },

  renderScene(route, navigator) {
    var Component = route.component;
    return <Component {...route.props} navigator={navigator} />;
  },

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight;
  },

  routeMapper: {

    LeftButton(route, navigator, index, navState) {
      if (index === 0) {
        return null;
      }

      return (<TouchableHighlight style={{marginTop: 10}} onPress={() => {
        if (index > 0) {
          navigator.pop();
        }
      }}>
        <Text>{navState.routeStack[index - 1].title}</Text>
      </TouchableHighlight>
      );
    },

    RightButton() {
      return null;
    },

    Title(route) {
      return (<Text style={Styles.default.label}>{route.title}</Text>);
    },

  },

});

module.exports = NavRedux;
