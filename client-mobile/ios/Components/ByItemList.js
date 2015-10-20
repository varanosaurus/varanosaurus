'use strict';

var React = require('react-native');

var {
  StyleSheet,
  ListView,
  View,
  Text
} = React;

var ByItemCell = require('./ByItemCell');
var ByItemDetails = require('./ByItemDetails');

/* This mock data is here to simulate our API */
var mockedData = [
  {
    byItemName: 'Milk',
  },
  {
    byItemName: 'Biscuit',
  },
  {
    byItemName: 'Bread',
  },
  {
    byItemName: 'Juice',
  },
  {
    byItemName: 'Detergent',
  },
  {
    byItemName: 'Drinking Water',
  },
  {
    byItemName: 'Flower',
  },
];

var ByItemList = React.createClass({

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

  selectByItem: function(byItem: Object) {
    this.props.onSelectByItem(byItem);
  },

  renderRow: function(byItem) {
    return (
      <ByItemCell
        onSelect={() => this.selectByItem(byItem)}
        byItem={byItem}
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

module.exports = ByItemList;
