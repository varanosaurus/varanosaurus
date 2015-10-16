var Sequelize = require('sequelize');

var config = require('./postgres.config.js');
var url = process.env.DATABASE_URL; //SET THIS UP PROPERLY SOON

var listItem = require('./models/ListItem.js');
var household = require('./models/Household.js');
var reckoning = require('./models/Reckoning.js');
var user = require('./models/User.js');

var dbEnvironment = process.env.NODE_ENV;

var schema;
var shouldForce;

if (dbEnvironment === 'test') {
  schema = config.testSchema;
} else {
  schema = config.mainSchema;
}

//not sure what the ssl does yet, will look this up in a minute
//yell at Naomi if she forgets to get back to this
var db = new Sequelize(url, {ssl: true, {schema: schema}});

var ListItem = db.define('listItem', listItem.attributes, listItem.options);
ListItem.schema(schema);

var Household = db.define('household', household.attributes, household.options);
Household.schema(schema);

var Reckoning = db.define('reckoning', reckoning.attributes, reckoning.options);
Reckoning.schema(schema);

var User = db.define('user', user.attributes, user.options);
User.schema(schema);

ListItem.belongsTo(Household);
Household.hasMany(ListItem);

Reckoning.belongsTo(Household);
Household.hasMany(Reckoning);

//not sure we need this one, we might be able
//to get it by querying what we already have?
ListItem.belongsTo(Reckoning);
Reckoning.hasMany(ListItem);

User.belongsTo(Household);
Household.hasMany(User);

if (dbEnvironment === 'test' || dbEnvironment === 'reset') {
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
  init: init
};


