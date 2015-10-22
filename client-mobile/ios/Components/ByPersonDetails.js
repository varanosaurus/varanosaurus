'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var ByPersonDetails = React.createClass({
  render: function() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.mainSection}>
          <Text style={styles.personName}>{this.props.byPerson.byPersonName}</Text>
          <Text style={styles.personName}>{this.props.byPerson.byPersonName}</Text>
          <Text style={styles.personName}>{this.props.byPerson.byPersonName}</Text>
          <Text style={styles.personName}>{this.props.byPerson.byPersonName}</Text>
          <Text style={styles.personName}>{this.props.byPerson.byPersonName}</Text>
          <Text style={styles.personName}>{this.props.byPerson.byPersonName}</Text>
          <Text style={styles.personName}>{this.props.byPerson.byPersonName}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  personName: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: '500',
  },
  mainSection: {
    flex: 1,
  },
});

module.exports = ByPersonDetails;
