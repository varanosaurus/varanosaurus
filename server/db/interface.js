var Sequelize = require('sequelize');

// var config = require('./postgres.config.js');

var itemConfig = require('./models/Item');
var householdConfig = require('./models/Household');
var reckoningConfig = require('./models/Reckoning');
var userConfig = require('./models/User');
var userToReckoningConfig = require('./models/UserToReckoning');
var invitationConfig = require('./models/Invitation');

var dbEnvironment = process.env.NODE_ENV;

var shouldForce;

var url;
if (dbEnvironment === 'testing') {
  url = `postgres://${process.env.USER !== 'travis' ? process.env.USER : 'postgres'}:@localhost/knead`;
} else {
  url = process.env.DATABASE_URL;
}

var schema = 'knead';

var db = new Sequelize(url, {ssl: true, logging: false, define: {schema}});

var Item = db.define('item', itemConfig.attributes, itemConfig.options);

var Household = db.define('household', householdConfig.attributes, householdConfig.options);

var Reckoning = db.define('reckoning', reckoningConfig.attributes, reckoningConfig.options);

var User = db.define('user', userConfig.attributes, userConfig.options);

var UserToReckoning = db.define('userToReckoning', userToReckoningConfig.attributes, userToReckoningConfig.options);

var Invitation = db.define('invitation', invitationConfig.attributes, invitationConfig.options);

Item.belongsTo(Household);
Household.hasMany(Item);

Item.belongsTo(User, {as: 'addingUser'});
Item.belongsTo(User, {as: 'fetchingUser'});
Item.belongsTo(User, {as: 'buyingUser'});

Item.belongsTo(Reckoning);
Reckoning.hasMany(Item);

User.belongsToMany(Reckoning, {through: UserToReckoning});
Reckoning.belongsToMany(User, {through: UserToReckoning});

Reckoning.belongsTo(Household);
Household.hasMany(Reckoning);

User.belongsTo(Household);
Household.hasMany(User);

Household.belongsTo(User, {as: 'creator', constraints: false});
Household.belongsTo(User, {as: 'captain', constraints: false});

Invitation.belongsTo(User, {as: 'toUser'});
Invitation.belongsTo(User, {as: 'fromUser'});
User.hasMany(Invitation, {as: 'sentInvitations', foreignKey: 'fromUserId'});
User.hasMany(Invitation, {as: 'receivedInvitations', foreignKey: 'toUserId'});

Invitation.belongsTo(Household);
Household.hasMany(Invitation);

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
  UserToReckoning,
  Invitation,
  init,
};
