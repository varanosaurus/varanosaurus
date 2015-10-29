'use strict';

var React = require('react-native');

// var Actions = require('../Actions/Actions');
var Routes = require('../Services/Routes');

var {
  Navigator,
  TouchableHighlight,
  Text,
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
    console.log('rendering navigator');
    return (
        <Navigator
          initialRoute={Routes.hometab}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
          ref='navigator'
          navigationBar={<Navigator.NavigationBar routeMapper={this.routeMapper} />}
        />
      );
  },

  renderScene(route, navigator) {
    var Component = route.component;
    console.log('rendering component:');
    console.dir(Component);
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

      return (<TouchableHighlight style={{marginTop: 30}} onPress={() => {
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
      return (<Text>{route.title}</Text>);
    },

  },

});

module.exports = NavRedux;
