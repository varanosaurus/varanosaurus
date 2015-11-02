function createAssociations(db) {
  // Alias models for readability
  var Household = db.models.household;
  var Invitation = db.models.invitation;
  var Item = db.models.item;
  var Payment = db.models.payment;
  var Reckoning = db.models.reckoning;
  var User = db.models.user;
  var UserToReckoning = db.models.userToReckoning;

  // Associate many items to one household
  Item.belongsTo(Household);
  Household.hasMany(Item);

  // Associate two users ('addingUser', 'buyingUser') to one item
  Item.belongsTo(User, {as: 'addingUser'});
  Item.belongsTo(User, {as: 'buyingUser'});

  // Associate many items to one reckoning
  Item.belongsTo(Reckoning);
  Reckoning.hasMany(Item);

  // Associate many users to many reckonings through 'userToReckoning' table
  User.belongsToMany(Reckoning, {through: UserToReckoning});
  Reckoning.belongsToMany(User, {through: UserToReckoning});

  // Associate many reckonings to one household
  Reckoning.belongsTo(Household);
  Household.hasMany(Reckoning);

  // Associate many users to one household
  User.belongsTo(Household);
  Household.hasMany(User);

  // Associate two specific users ('creator', 'captain') to a household
  Household.belongsTo(User, {as: 'creator', constraints: false});
  Household.belongsTo(User, {as: 'captain', constraints: false});

  // Associate two users ('toUser', 'fromUser') to one payment
  Payment.belongsTo(User, {as: 'toUser'});
  Payment.belongsTo(User, {as: 'fromUser'});

  // Reciprocal of above: associate many payments to one user
  // as both the 'toUser' and 'fromUser'
  User.hasMany(Payment, {as: 'toUser', foreignKey: 'toUserId'});
  User.hasMany(Payment, {as: 'fromUser', foreignKey: 'fromUserId'});

  // Associate many payments to one reckoning
  Payment.belongsTo(Reckoning);
  Reckoning.hasMany(Payment);

  // Associate two users ('toUser', 'fromUser') to one invitation
  Invitation.belongsTo(User, {as: 'toUser'});
  Invitation.belongsTo(User, {as: 'fromUser'});

  // Reciprocal of above: associate many invitations to one user
  // as both the 'toUser' and 'fromUser'
  User.hasMany(Invitation, {as: 'sentInvitations', foreignKey: 'fromUserId'});
  User.hasMany(Invitation, {as: 'receivedInvitations', foreignKey: 'toUserId'});

  // Associate many invitations to one household
  Invitation.belongsTo(Household);
  Household.hasMany(Invitation);
}

module.exports = createAssociations;
