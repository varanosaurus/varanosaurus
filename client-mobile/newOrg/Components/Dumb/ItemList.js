'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
// var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Foundation');

var {
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
    var dataSource = this.dataSource.cloneWithRows(this.props.items);

    var selectedIndex;

    if (this.props.itemsFilter === 'pending') {
      selectedIndex = 0;
    } else {
      selectedIndex = 1;
    }

      //  <TouchableHighlight
      //    style={Styles.default.floatView}
      //    onPress={}>Add an item
      //  </TouchableHighlight>

    return (
      <View style={Styles.list.container}>
        <SegmentedControlIOS
          values={['Pending', 'Bought']}
          selectedIndex={selectedIndex}
          tintColor={'327CCB'}
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
        />
        <TouchableHighlight
          style={Styles.default.floatView}
          onPress={this.props.gotoItemAddView} >
          <Icon name='clipboard-pencil' size={70} color="327CCB" />
        </TouchableHighlight>
      </View>
    );
  },

  renderRow(item) {

    return (
        <TouchableHighlight
          style={Styles.list.row}
          onPress={() => this.props.gotoItemDetailsView(item)} >
          <View>
            <Text style={Styles.list.label}>{item.description}</Text>
          </View>
        </TouchableHighlight>
    );

  },

});

module.exports = ItemList;
