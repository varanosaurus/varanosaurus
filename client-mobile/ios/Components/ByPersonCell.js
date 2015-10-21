'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var ByPersonCell = React.createClass({
  render: function() {
    var TouchableElement = TouchableHighlight;

    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect} >
          <View style={styles.ByPersonCell}>
            <Text style={styles.byPersonName}>{this.props.byPerson.byPersonName}</Text>
          </View>
        </TouchableElement>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    backgroundColor: '#F5FCFF'
  },
  ByPersonCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 6,
    marginRight: 6,
    padding: 6,
    borderBottomWidth: .5,
    borderColor: 'lightgray'
  },
  byPersonName: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  }
});

module.exports = ByPersonCell;
