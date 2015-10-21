var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} = React;

var InvitedToHH = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>You have been invited to join -Inject Household- </Text>
        <TouchableHighlight
          style={styles.button}
          // onPress={() => this.()}
        >
          <Text style={styles.btnText}>Join</Text>

        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          // onPress={() => this.()}
        >
          <Text style={styles.btnText}>No, thanks</Text>

        </TouchableHighlight>

        <Text> ----- OR ----- </Text>
        <TouchableHighlight
          style={styles.button}
          // onPress={() => this.()}
        >
          <Text style={styles.btnText}>Create new household</Text>

        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    backgroundColor: 'white'
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  button: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
});

module.exports = InvitedToHH;
