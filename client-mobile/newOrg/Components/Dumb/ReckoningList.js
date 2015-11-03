'use strict';

var React = require('react-native');
var Styles = require('../../Styles/Styles');

var {
  ListView,
  View,
  TouchableHighlight,
  Text,
} = React;

// var ReckoningCell = require('./ReckoningCell');

var ReckoningList = React.createClass({

  componentWillMount() {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
  },

  renderRow(reckoning) {
    return (
      <TouchableHighlight
        style={Styles.list.row}
        onPress={() => this.props.gotoReckoningDetailsView(reckoning)} >
        <View>
          <Text style={Styles.list.label}>{reckoning.date.toString()}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  render() {
    var dataSource = this.dataSource.cloneWithRows(this.props.reckonings);
    return (
        <View style={Styles.list.container}>
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
            automaticallyAdjustContentInsets={false}
            contentInset={{bottom: 50}}
           />
        </View>
      );
  },

});

module.exports = ReckoningList;
