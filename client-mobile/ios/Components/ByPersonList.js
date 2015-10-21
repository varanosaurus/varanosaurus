'use strict';

var React = require('react-native');

var {
  StyleSheet,
  ListView,
  View,
  Text
} = React;

var ByPersonCell = require('./ByPersonCell');
var ByPersonDetails = require('./ByPersonDetails');

/* This mock data is here to simulate our API */
var mockedData = [
  {
    byPersonName: 'Kyle',
  },
  {
    byPersonName: 'Cameron',
  },
  {
    byPersonName: 'Naomi',
  },
  {
    byPersonName: 'Amy',
  },
  {
    byPersonName: 'Daniel',
  },
  {
    byPersonName: 'Taylor',
  },
  {
    byPersonName: 'Sova',
  },
];

var ByPersonList = React.createClass({

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
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(mockedData)
    });
  },

  selectByPerson: function(byPerson: Object) {
    this.props.onSelectByPerson(byPerson);
  },

  renderRow: function(byPerson) {
    return (
      <ByPersonCell
        onSelect={() => this.selectByPerson(byPerson)}
        byPerson={byPerson}
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

module.exports = ByPersonList;
