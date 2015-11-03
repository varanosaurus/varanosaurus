var {StyleSheet} = require('react-native');

var Styles = {};

Styles.navbar = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#ACAEB0',
  },
});

Styles.default = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#327CCB',
    textAlign: 'center',
  },
  subheading: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
});

Styles.alert = StyleSheet.create({
  info: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    marginLeft: 10,
    textAlign: 'center',
    color: '#cccccc',
  },
  infoLeft: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    margin: 10,
    textAlign: 'left',
    color: '#cccccc',
  },
  error: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    marginLeft: 10,
    textAlign: 'center',
    color: 'red',
  },
});

Styles.input = StyleSheet.create({
  textboxLabel: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: '#327CCB',
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  textboxField: {
    marginLeft: 10,
    marginRight: 10,
    color: '#000000',
    fontSize: 17,
    height: 36,
    padding: 7,
    borderRadius: 4,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 5,
  },
});

Styles.btn = StyleSheet.create({
  btn: {
    margin: 10,
    backgroundColor: '#327CCB',
    color: 'white',
    padding: 10,
    borderRadius: 20,
  },
  floatBtn: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    // borderRadius: 35,
  },
});

Styles.page = StyleSheet.create({
  pendingTitle: {
    fontFamily: 'Arial',
    fontSize: 39,
    color: 'gray',
  },
  boughtTitle: {
    margin: 20,
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#327CCB',
  },
  boughtBy: {
    margin: 20,
    fontFamily: 'Helvetica',
    fontSize: 24,
  },
  boughtDetails: {
    margin: 20,
    fontFamily: 'Helvetica',
    fontSize: 24,
  },
  boughtDollar: {
    margin: 20,
    fontFamily: 'Helvetica',
    fontSize: 70,
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
    borderColor: '#327CCB',
  },
  label: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
});

module.exports = Styles;
