'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var StatementCell = React.createClass({
  render: function() {
    var TouchableElement = TouchableHighlight;

    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect} >
          <View style={styles.StatementCell}>
            <Text style={styles.statementName}>{this.props.statement.statementName}</Text>
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
  StatementCell: {
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
  statementName: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  }
});

module.exports = StatementCell;
