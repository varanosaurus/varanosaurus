var Sequelize = require('sequelize');

// var config = require('./postgres.config.js');

var listConfig = require('./models/Item.js');
var householdConfig = require('./models/Household.js');
var reckoningConfig = require('./models/Reckoning.js');
var userConfig = require('./models/User.js');

var dbEnvironment = process.env.NODE_ENV;

var shouldForce;

var url = process.env.DATABASE_URL; //SET THIS UP PROPERLY SOON

var schema = 'knead';

//not sure what the ssl does yet, will look this up in a minute
//yell at Naomi if she forgets to get back to this
var db = new Sequelize(url, {ssl: true, logging: false, define: {schema}});

var ListItem = db.define('listitem', listItemConfig.attributes, listItemConfig.options);

var Household = db.define('household', householdConfig.attributes, householdConfig.options);

var Reckoning = db.define('reckoning', reckoningConfig.attributes, reckoningConfig.options);

var User = db.define('user', userConfig.attributes, userConfig.options);

Item.belongsTo(Household);
Household.hasMany(Item);

Reckoning.belongsTo(Household);
Household.hasMany(Reckoning);

User.belongsTo(Household);
Household.hasMany(User);
Household.belongsTo(User, {as: 'Creator', constraints: false});

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
  Item: Item,
  Household: Household,
  Reckoning: Reckoning,
  User: User,
  init: init,
};

//little change
