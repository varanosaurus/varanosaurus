'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} = React;

var ItemDetail = React.createClass({

  getInitialState() {
    return {price: 0};
  },

  // changeData() {
  //   this.setState({
  //     total: globalData + 1,
  //   });
  //   globalData += 1;
  // },
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.item.item.description}</Text>
        <Text>Requested By: {this.props.item.creator.username}</Text>
        <Text>Details: {this.props.item.item.details}</Text>
        <Text style={styles.showing}>$ {}</Text>
        <View style={styles.board}>
          <View style={styles.rows}>
            <TouchableHighlight
              onPress={this.handlePress.bind(this, 1)}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={styles.cell}>
                <Text style={styles.textInside}>1</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handlePress.bind(this, 2)}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={styles.cell}>
                <Text style={styles.textInside}>2</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handlePress.bind(this, 3)}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={styles.cell}>
                <Text style={styles.textInside}>3</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.rows}>
            <TouchableHighlight
              onPress={this.handlePress.bind(this, 4)}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={styles.cell}>
                <Text style={styles.textInside}>4</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handlePress.bind(this, 5)}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={styles.cell}>
                <Text style={styles.textInside}>5</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handlePress.bind(this, 6)}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={styles.cell}>
                <Text style={styles.textInside}>6</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.rows}>
            <TouchableHighlight
              onPress={this.handlePress.bind(this, 7)}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={styles.cell}>
                <Text style={styles.textInside}>7</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this.handlePress.bind(this, 8)}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={styles.cell}>
                <Text style={styles.textInside}>8</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handlePress.bind(this, 9)}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={styles.cell}>
                <Text style={styles.textInside}>9</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.rows}>
            <TouchableHighlight
              onPress={this.handleClear}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={[styles.cell, styles.functionalButton]}>
                <Text style={[styles.textInside, styles.functionalText]}>AC</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handlePress.bind(this, 0)}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={styles.cell}>
                <Text style={styles.textInside}>0</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handleResult}
              underlayColor="transparent"
              activeOpacity={0.8}>
              <View style={[styles.cell, styles.functionalButton]}>
                <Text style={[styles.textInside, styles.functionalText]}>Add</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  },
});

module.exports = ItemDetail;

var styles = StyleSheet.create({
  key: {
    backgroundColor: 'blue',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 64,
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 39,
    color: 'gray',
  },
  board: {
    padding: 1,
    backgroundColor: '#000000',
  },
  rows: {
    flexDirection: 'row',
  },
  cell: {
    height: 90,
    width: 90,
    backgroundColor: '#f1f1f1',
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showing: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 50,
    fontFamily: 'Arial',
  },
  textInside: {
    fontFamily: 'Arial',
    fontSize: 30,
  },
  functionalButton: {
    backgroundColor: '#2fb4da',
  },
  functionalText: {
    color: 'white',
  },
});
