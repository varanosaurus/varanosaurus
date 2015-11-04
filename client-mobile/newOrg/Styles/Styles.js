var {StyleSheet} = require('react-native');

var Styles = {};

var primaryColor = '#CFD8DC';
var accentColor = '#E65100';
var secondaryColor = '#546E7A';
var neutralColor = 'rgb(92, 87, 93)';

Styles.iconColor = accentColor;
Styles.secondaryColor = secondaryColor;
Styles.background = StyleSheet.create({
  navbarArea: {
    flex: 1,
    marginTop: 20,
  },
  belowNavbarArea: {
    flex: 1,
    resizeMode: 'cover',
  },
  transparentBackground: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  authArea: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    margin: 20,
  },
});

Styles.navbar = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: secondaryColor,
    backgroundColor: primaryColor,
  },
});

Styles.default = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    // backgroundColor: primaryColor,
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
  },
  subheading: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: 'white',
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
    color: accentColor,
  },
  infoLeft: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    margin: 10,
    textAlign: 'left',
    color: accentColor,
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
    color: primaryColor,
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
    borderColor: secondaryColor,
    borderWidth: 1,
    marginBottom: 5,
  },
});

Styles.btn = StyleSheet.create({
  btn: {
    margin: 10,
    backgroundColor: secondaryColor,
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
    color: primaryColor,
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
    borderColor: primaryColor,
  },
  label: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
});

module.exports = Styles;
