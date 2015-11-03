'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');

var {
  Text,
  TouchableHighlight,
  View,
} = React;

var ReckoningCell = React.createClass({
  render() {
    var TouchableElement = TouchableHighlight;

    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect} >
          <View style={Styles.list.row}>
            <Text style={Styles.list.label}>{this.props.reckoning}</Text>
          </View>
        </TouchableElement>
      </View>
    );
  },
});

module.exports = ReckoningCell;
