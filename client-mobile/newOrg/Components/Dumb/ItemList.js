'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Icon = require('react-native-vector-icons/Ionicons');

var {
  ListView,
  View,
  SegmentedControlIOS,
  TouchableHighlight,
  Text,
  Image,
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

    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/76/e7/67/76e767dbeaad4e6eb37a23698170e006.jpg'}}
          style={Styles.background.belowNavbarArea}>
      <View style={Styles.list.container}>
        <SegmentedControlIOS
          style={{backgroundColor: 'white'}}
          values={['Pending', 'Bought']}
          selectedIndex={selectedIndex}
          tintColor={Styles.secondaryColor}
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
          showVerticalScrollIndicator={true}
        />
        <TouchableHighlight
          underlayColor='white'
          style={Styles.btn.floatBtn}
          onPress={this.props.gotoItemAddView} >
          <Icon name='ios-plus' size={70} color={Styles.secondaryColor} />
        </TouchableHighlight>
      </View>
      </Image>
      </View>
    );
  },

  renderRow(item) {

    return (
        <TouchableHighlight
          style={Styles.list.row}
          onPress={() => this.props.gotoItemDetailsView(item)} >
          <View>
            <Text style={Styles.list.label}>{item.description}<Icon name='ios-arrow-right' size={20} color={Styles.accentColor} /></Text>
          </View>
        </TouchableHighlight>
    );

  },

});

module.exports = ItemList;
