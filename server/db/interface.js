var Sequelize = require('sequelize');

var dbEnvironment = process.env.NODE_ENV;
var testSeed = require('./testSeed');

var shouldForce;

var url;
if (dbEnvironment === 'testing' || dbEnvironment === 'development') {
  url = `postgres://${process.env.USER !== 'travis' ? process.env.USER : 'postgres'}:@localhost/knead`;
} else {
  url = process.env.DATABASE_URL;
}

var schema = 'knead';

var defineModels = require('./models/models');
var createAssociations = require('./associations');

var db = new Sequelize(url, {ssl: true, logging: false, define: {schema}});

// Pass sequelize instance to have models defined upon it
defineModels(db);

// Pass sequelize instance to have associations created among its models
createAssociations(db);

// Alias models for convenient export
var Household = db.models.household;
var Invitation = db.models.invitation;
var Item = db.models.item;
var Payment = db.models.payment;
var Reckoning = db.models.reckoning;
var User = db.models.user;
var UserToReckoning = db.models.userToReckoning;

if (dbEnvironment === 'reset' || dbEnvironment === 'testing' || dbEnvironment === 'development') {
  shouldForce = true;
} else {
  shouldForce = false;
}

var init = function() {
  return db.sync({force: shouldForce})
    .then(function() {
      if (dbEnvironment === 'reset') {
        process.exit(0);
      } else if (dbEnvironment === 'development') {
       return testSeed();
      }
    });
};

module.exports = {
  sequelize: db,
  Item,
  Household,
  Reckoning,
  User,
  UserToReckoning,
  Payment,
  Invitation,
  init,
};
