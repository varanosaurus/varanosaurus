var Sequelize = require('sequelize');

// var config = require('./postgres.config.js');

var itemConfig = require('./models/Item.js');
var householdConfig = require('./models/Household.js');
var reckoningConfig = require('./models/Reckoning.js');
var userConfig = require('./models/User.js');

var dbEnvironment = process.env.NODE_ENV;

var shouldForce;

var url = process.env.DATABASE_URL; //SET THIS UP PROPERLY SOON

var schema = 'knead';

var db = new Sequelize(url, {ssl: true, logging: false, define: {schema}});

var Item = db.define('item', itemConfig.attributes, itemConfig.options);

var Household = db.define('household', householdConfig.attributes, householdConfig.options);

var Reckoning = db.define('reckoning', reckoningConfig.attributes, reckoningConfig.options);

var User = db.define('user', userConfig.attributes, userConfig.options);

Item.belongsTo(Household);
Household.hasMany(Item);

Reckoning.belongsTo(Household);
Household.hasMany(Reckoning);

User.belongsTo(Household);
Household.hasMany(User);

//this will allow you to validate that a user does not already
//have a household when you add a household
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
