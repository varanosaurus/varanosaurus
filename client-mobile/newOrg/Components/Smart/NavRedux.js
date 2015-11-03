'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Icon = require('react-native-vector-icons/Foundation');

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

    LeftButton(route, navigator, index) {
      if (index === 0) {
        return null;
      }

      return (<TouchableHighlight style={{marginTop: 10}} onPress={() => {
        if (index > 0) {
          navigator.pop();
        }
      }}>
        <Icon stype={{marginTop: 15, marginLeft: 10}} name='arrow-left' size={30} color="327CCB" />
      </TouchableHighlight>
      );
    },

    RightButton() {
      return null;
    },

    Title() {
      return (<Text style={{marginTop: 10, fontSize: 20, fontFamily: 'Helvetica'}}>Knead</Text>);
    },

  },

});

module.exports = NavRedux;
