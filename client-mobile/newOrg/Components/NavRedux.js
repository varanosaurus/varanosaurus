'use strict';

var React = require('react-native');
// var NavBar = require('react-native-navbar');
var {connect} = require('react-redux');

// var Actions = require('../Actions/Actions');
var Routes = require('../Services/Routes');

var {
  Navigator,
  TouchableHighlight,
  Text,
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

    console.log('rendering navigator, pre-navbar');

    var navBar = <Navigator.NavigationBar
      title={this.props.routes[this.props.routes.length - 1].title}
      routeMapper={this.routeMapper}
    />;

    console.log('post creation of navbar');

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
    console.log('attempting to render a route: ' + route);
    var Component = route.component;
    return (
      <Component {...route.props} />
    );
  },

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight;
  },

  goBack() {
    this.dispatch(/*TODO: Actions.popRoute()*/);
  },

  routeMapper: {

    LeftButton(route, navigator, index) {
      return (<TouchableHighlight style={{marginTop: 30}} onPress={() => {
        if (index > 0) {
          this.goBack();
        }
      }}>
      <Text>Back</Text>
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

function select(state) {
  var routes = state.routes.map((routeName) => Routes[routeName]());

  return {
    routes,
  };
}

module.exports = connect(select)(NavRedux);
