var Sequelize = require('sequelize');

var config = require('./postgres.config.js');
var url = process.env.DATABASE_URL; //SET THIS UP PROPERLY SOON

var listItemConfig = require('./models/ListItem.js');
var householdConfig = require('./models/Household.js');
var reckoningConfig = require('./models/Reckoning.js');
var userConfig = require('./models/User.js');

var dbEnvironment = process.env.NODE_ENV;

var schema = 'knead';

//not sure what the ssl does yet, will look this up in a minute
//yell at Naomi if she forgets to get back to this
var db = new Sequelize(url, {ssl: true, {schema: schema}});

var ListItem = db.define('listItem', listItemConfig.attributes, listItemConfig.options);
ListItem.schema(schema);

var Household = db.define('household', householdConfig.attributes, householdConfig.options);
Household.schema(schema);

var Reckoning = db.define('reckoning', reckoningConfig.attributes, reckoningConfig.options);
Reckoning.schema(schema);

var User = db.define('user', userConfig.attributes, userConfig.options);
User.schema(schema);

ListItem.belongsTo(Household);
Household.hasMany(ListItem);

Reckoning.belongsTo(Household);
Household.hasMany(Reckoning);

User.belongsTo(Household);
Household.hasMany(User);

if (dbEnvironment === 'reset') {
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
  ListItem: ListItem,
  Household: Household,
  Reckoning: Reckoning,
  User: User,
  init: init,
};


