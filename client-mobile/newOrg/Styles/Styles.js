var {StyleSheet} = require('react-native');

var Styles = {};

Styles.default = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  floatView: {
    position: 'absolute',
    // width: 70,
    // height: 70,
    bottom: 80,
    right: 20,
    borderRadius: 35,
  },
});

Styles.navbar = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#ACAEB0',
  },
});

Styles.list = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    // backgroundColor: '#F5FCFF',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 6,
    marginRight: 6,
    padding: 6,
    borderBottomWidth: 1,
    borderColor: '327CCB',
  },
  label: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
});

Styles.page = StyleSheet.create({

});

module.exports = Styles;
