'use strict';

var React = require('react-native');

// var Actions = require('../Actions/Actions');
var Routes = require('../Services/Routes');

var {
  Navigator,
  TouchableHighlight,
  Text,
  View,
} = React;


var NavRedux = React.createClass({

  // componentWillMount() {
  //   this.navigator = <Navigator
  //     initialRoute={Routes.hometab}
  //     renderScene={this.renderScene}
  //     configureScene={this.configureScene}
  //     ref='navigator'
  //     />;
  // },

  render() {

    return <Navigator
      initialRoute={Routes.hometab}
      renderScene={this.renderScene}
      configureScene={this.configureScene}
      ref='navigator'
      />;

  },

  renderScene(route) {
    var NavBar = Navigator.NavigationBar;
    var Component = route.component;

    if (route.name === 'hometab') {
      return <Component />;
    } else {
      return (
        <View>
          <NavBar title={route.title} routeMapper={this.routeMapper} />
          <Component {...route.props} />
        </View>
      );
    }
  },

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight;
  },

  routeMapper: {

    LeftButton(route, navigator, index) {
      return (<TouchableHighlight style={{marginTop: 30}} onPress={() => {
        if (index > 0) {
          this.navigator.pop();
        }
      }}>
      {() => {
        if (index > 0) {
          return <Text>{this.navigator.getCurrentRoutes()[index - 1].title}</Text>;
        }
      }}
      </TouchableHighlight>
      );
    },

    RightButton() {
      return;
    },

    Title(route) {
      return (<Text>{route.title}</Text>);
    },

  },

});

module.exports = NavRedux;
