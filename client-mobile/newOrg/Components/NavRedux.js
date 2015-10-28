'use strict';

var React = require('react-native');
var Navbar = require('react-native-navbar');
var {connect} = require('react-redux');

var Actions = require('../Actions/Actions');

var {
  Navigator,
} = React;

var NavRedux = React.createClass({

  componentWillReceiveProps(nextProps) {
    var next = nextProps.routes;
    var current = this.getCurrentRoutes();
    var i;

    for (i = 0; i < Math.max(next.routes.length, current.length); i++) {

      if (next.routes[i] && !current[i]) {
        this.push(next.routes[i]);
        break;
      }

      if (!next.routes[i] && current[i]) {
        this.pop();
        break;
      }

    }
  },

  render() {

    var leftButtonConfig = {};

    if (this.props.routes.length > 1) {
      leftButtonConfig.title = 'Back';
      leftButtonConfig.handler = this.goBack;
    }

    var navBar = <NavBar
      title={this.props.routes[this.props.routes.length - 1].title}
      leftButton={leftButtonConfig}
    />;

    return (
      <Navigator
        initialRouteStack={this.props.routes}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        navigationBar={navBar}
        />
    );
  },

  renderScene(route) {
    var Component = route.Component;
    return (
      <Component {...route.props} />
    );
  },

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight;
  },

  goBack() {

  },

});

function select(state) {
  return {
    routes: state.routes,
  };
}

module.exports = connect(select)(NavRedux);
