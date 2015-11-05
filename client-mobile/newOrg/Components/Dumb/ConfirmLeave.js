'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Button = require('react-native-button');

var {
  View,
  Text,
  Image,
} = React;

var ConfirmLeave = React.createClass({
  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: Styles.patternURI}}
          style={Styles.background.belowNavbarArea}>
          <View style={Styles.list.container}>
            <Text>Are you sure you want to leave?</Text>
            <Button style={Styles.btn.btn} onPress={this.props.gotoReckonAndLeave}>
              Yes
            </Button>
            <Button style={Styles.btn.btn} onPress={this.props.gotoSettingsOptions}>
              No
            </Button>
          </View>
        </Image>
      </View>
    );
  },

});

module.exports = ConfirmLeave;
