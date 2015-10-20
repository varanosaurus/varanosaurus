'use strict';

var React = require('react-native');

var {
  StyleSheet,
  ListView,
  View,
  Text,
  SegmentedControlIOS,
} = React;

var Cell = require('./Cell');
var ItemDetails = require('./ItemDetails');

/* This mock data is here to simulate our API */
var mockedData = [
  {
    itemName: 'Milk',
    itemPrice: 10
  },
  {
    itemName: 'Bread',
    itemPrice: 7
  },
  {
    itemName: 'Detergent',
    itemPrice: 10
  },
  {
    itemName: 'Drinking Water',
    itemPrice: 9
  },
  {
    itemName: 'Kitchen Towel',
    itemPrice: 5
  },
  {
    itemName: 'Soap',
    itemPrice: 9
  },
  {
    itemName: 'Monthly Internet',
    itemPrice: 9
  },
  {
    itemName: 'Chips',
    itemPrice: 9
  },
  {
    itemName: 'Milk',
    itemPrice: 10
  },
  {
    itemName: 'Bread',
    itemPrice: 7
  },
  {
    itemName: 'Detergent',
    itemPrice: 10
  },
  {
    itemName: 'Drinking Water',
    itemPrice: 9
  },
  {
    itemName: 'Kitchen Towel',
    itemPrice: 5
  },
  {
    itemName: 'Soap',
    itemPrice: 9
  },
  {
    itemName: 'Monthly Internet',
    itemPrice: 9
  },
  {
    itemName: 'Chips',
    itemPrice: 9
  },
  {
    itemName: 'Chips',
    itemPrice: 9
  },
  {
    itemName: 'Milk',
    itemPrice: 10
  },
  {
    itemName: 'Bread',
    itemPrice: 7
  },
  {
    itemName: 'Detergent',
    itemPrice: 10
  },
  {
    itemName: 'Drinking Water',
    itemPrice: 9
  },
  {
    itemName: 'Kitchen Towel',
    itemPrice: 5
  },
  {
    itemName: 'Soap',
    itemPrice: 9
  },
  {
    itemName: 'Monthly Internet',
    itemPrice: 9
  },
  {
    itemName: 'Chips',
    itemPrice: 9
  }
];

var ItemList = React.createClass({

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

  selectItem: function(item: Object) {
    console.log('selectItem call from itemList :', item);
    this.props.onSelectItem(item);
  },

  renderRow: function(item) {
    return (
      <Cell
        onSelect={() => this.selectItem(item)}
        item={item}
      />
    );
  },

  render: function() {
    return (
        <View style={styles.segmentControl}>
          <SegmentedControlIOS
            values={['Pending', 'Bought']}
            selectedIndex={0}
            tintColor={'#2fb4da'}
            onValueChange={(val) => {
              this.setState({
                selectedTab: val
              })
            }} />
            {this.renderListView()}
        </View>
      )
  },

  renderListView: function() {
    if (this.state.selectedTab === 'Pending') {
      return (
        <View style={styles.container}>
          {this.renderPendingListView()}
        </View>
      )
    } else if (this.state.selectedTab === 'Bought') {
      return (
        this.renderBoughtListView()
      )
    }
  },

  renderPendingListView: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}}
       />
    )
  },

  renderBoughtListView: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}}
       />
    )
  },

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
  itemName: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 6,
    textAlign: 'center',
  },
  segmentControl: {
    flex: 1,
    marginTop: 64
  }
});

module.exports = ItemList;
