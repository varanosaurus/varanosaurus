var Sequelize = require('sequelize');

// var config = require('./postgres.config.js');

var itemConfig = require('./models/Item.js');
var householdConfig = require('./models/Household.js');
var reckoningConfig = require('./models/Reckoning.js');
var userConfig = require('./models/User.js');

var dbEnvironment = process.env.NODE_ENV;

var shouldForce;

var url;
if (dbEnvironment === 'testing') {
  url = `postgres://${process.env.USER}:@localhost/knead`;
} else {
  url = process.env.DATABASE_URL;
}

var schema = 'knead';

var db = new Sequelize(url, {ssl: true, logging: false, define: {schema}});

var Item = db.define('item', itemConfig.attributes, itemConfig.options);

var Household = db.define('household', householdConfig.attributes, householdConfig.options);

var Reckoning = db.define('reckoning', reckoningConfig.attributes, reckoningConfig.options);

var User = db.define('user', userConfig.attributes, userConfig.options);

Item.belongsTo(Household);
Household.hasMany(Item);

Item.belongsTo(User, {as: 'AddingUser', allowNull: false});
Item.belongsTo(User, {as: 'FetchingUser'});
Item.belongsTo(User, {as: 'BuyingUser'});

Reckoning.belongsTo(Household);
Household.hasMany(Reckoning);

User.belongsTo(Household);
Household.hasMany(User);

Household.belongsTo(User, {as: 'Creator', constraints: false});
Household.belongsTo(User, {as: 'Captain', constraints: false});

if (dbEnvironment === 'reset' || dbEnvironment === 'testing') {
  shouldForce = true;
} else {
  shouldForce = false;
}

var init = function() {
  return db.sync({force: shouldForce})
    .then(function() {
      if (dbEnvironment === 'reset') {
        process.exit(0);
      }
    });
};

module.exports = {
  sequelize: db,
  Item,
  Household,
  Reckoning,
  User,
  init,
};
