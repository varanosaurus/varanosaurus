'use strict';

var React = require('react-native');
// var Icon = require('react-native-vector-icons/Ionicons');

var {
  // StyleSheet,
  ListView,
  View,
  SegmentedControlIOS,
  TouchableHighlight,
  Text,
} = React;

//TODO: add styles, add addItem functions

var ItemList = React.createClass({

  componentWillMount() {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  },

  render() {

    console.log('hello from inside itemlist:');
    console.log(this.props.items);
    var dataSource = this.dataSource.cloneWithRows(this.props.items);

    var selectedIndex;

    if (this.props.itemsFilter === 'pending') {
      selectedIndex = 0;
    } else {
      selectedIndex = 1;
    }

    return (
      <View>
        <SegmentedControlIOS
          values={['Pending', 'Bought']}
          selectedIndex={selectedIndex}
          tintColor={'#2fb4da'}
          onValueChange={(val) => {
            if (val === 'Pending') {
              this.props.gotoPendingItemsList();
            } else if (val === 'Bought') {
              this.props.gotoBoughtItemsList();
            }
          }} />
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow}
          automaticallyAdjustcontentInsets={false}
          contentInset={{bottom: 50}}
        />
      </View>
    );
  },

  renderRow(item) {

    return (
      <View>
        <TouchableHighlight
          onPress={() => this.props.goToItemDetailsView(item)} >
          <View>
            <Text>{item.description}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );

  },

});

module.exports = ItemList;
