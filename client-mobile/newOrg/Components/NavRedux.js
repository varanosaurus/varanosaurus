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

  componentWillMount() {
    var navBar = <Navigator.NavigationBar
      title={this.props.routes[this.props.routes.length - 1].title}
      routeMapper={this.routeMapper}
    />;

    this.navigator = <Navigator
      initialRoute={this.props.initialRoute}
      renderScene={this.renderScene}
      configureScene={this.configureScene}
      navigationBar={navBar}
      ref='navigator'
      />;
  },

  componentWillReceiveProps(nextProps) {
    console.log('hello from componentWillReceiveProps');
    var next = nextProps.routes;
    console.log(nextProps);
    console.dir(this);
    var current = this.refs.navigator.getCurrentRoutes();
    console.dir(current);
    var i;

    for (i = 0; i < Math.max(next.length, current.length); i++) {

      if (next[i] && !current[i]) {
        this.push(next[i]);
        break;
      }

      if (!next[i] && current[i]) {
        this.pop();
        break;
      }

    }
  },

  render() {
    console.log('rendering navbar');
    return this.navigator;

  },

  renderScene(route) {
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
  var initialRoute = Routes[state.initialRoute]();

  return {
    routes,
    initialRoute,
  };
}

module.exports = connect(select)(NavRedux);
