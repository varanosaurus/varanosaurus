'use strict';

var React = require('react-native');

var {
  StyleSheet,
  ListView,
  View,
  Text
} = React;

var StatementCell = require('./StatementCell');
var StatementDetails = require('./StatementDetails');

/* This mock data is here to simulate our API */
var mockedData = [
  {
    statementName: 'October',
  },
  {
    statementName: 'September',
  },
  {
    statementName: 'August',
  },
  {
    statementName: 'July',
  },
  {
    statementName: 'June',
  },
  {
    statementName: 'May',
  },
  {
    statementName: 'April',
  },
];

var StatementList = React.createClass({

  getInitialState: function() {
    return {
      isLoading: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }).cloneWithRows(mockedData),
      filter: '',
      queryNumber: 0
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    // Return mocked data for now
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(mockedData)
    });
  },

  selectStatement: function(statement: Object) {
    this.props.onSelectStatement(statement);
  },

  renderRow: function(statement) {
    return (
      <StatementCell
        onSelect={() => this.selectStatement(statement)}
        statement={statement}
      />
    );
  },

  render: function() {
    return (
        <View style={styles.segmentControl}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            style={styles.listView}
            automaticallyAdjustContentInsets={false}
            contentInset={{bottom: 50}}
           />
        </View>
      )
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    backgroundColor: '#F5FCFF'
  },
  Cell: {
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
  },
  segmentControl: {
    flex: 1,
    marginTop: 64
  }
});

module.exports = StatementList;
