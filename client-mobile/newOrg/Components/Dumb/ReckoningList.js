'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');
var Icon = require('react-native-vector-icons/Ionicons');
var Dates = require('../../Services/Dates');

var {
  ListView,
  View,
  TouchableHighlight,
  Text,
  Image,
} = React;

var ReckoningList = React.createClass({

  componentWillMount() {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
  },

  renderRow(reckoning) {
    return (
      <TouchableHighlight
        style={Styles.list.rowContainer}
        onPress={() => this.props.gotoReckoningDetailsView(reckoning)} >
        <View style={Styles.list.row}>
          <Text style={Styles.list.label}>{Dates(reckoning.date.toString())}</Text>
          <View style={Styles.list.rightContainer}>
            <Icon name='ios-arrow-right' size={20} color={Styles.accentColor} />
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  render() {
    var dataSource = this.dataSource.cloneWithRows(this.props.reckonings);
    return (
        <View style={{flex: 1}}>
          <Image
            source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/76/e7/67/76e767dbeaad4e6eb37a23698170e006.jpg'}}
            style={Styles.background.belowNavbarArea}>
            <View style={Styles.list.container}>
              <ListView
                dataSource={dataSource}
                renderRow={this.renderRow}
                automaticallyAdjustContentInsets={false}
                contentInset={{bottom: 50}}
               />
            </View>
          </Image>
        </View>
      );
  },

});

module.exports = ReckoningList;
