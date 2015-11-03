
var seed = function() {
  //this is required here so that db is defined
  //by the time the require happens
  var db = require('./interface');
  var reckon = require('../services/reckon');

  var userIds = {};
  var householdIds = {};

  return db.User.bulkCreate([
    {
      username: 'brandon',
      password: 'password',
    },
    {
      username: 'lyanna',
      password: 'password',
    },
    {
      username: 'rhaegar',
      password: 'password',
    },
    {
      username: 'jonSnow',
      password: 'password',
    },
    {
      username: 'danyTarg',
      password: 'password',
    },
    {
      username: 'eddard',
      password: 'password',
    },
  ], {returning: true, individualHooks: true})

  .then(function(users) {

    users.forEach(function(user) {
      userIds[user.username] = user.id;
    });

    return db.Household.bulkCreate([
      {
        name: 'Stark',
        creatorId: 1,
        id: 1,
        //id 1
      },
      {
        name: 'Targaryen',
        creatorId: 3,
        id: 2,
        //id 2
      },
    ], {returning: true});
  })

  .then(function(households) {
    households.forEach(function(household) {
      householdIds[household.name] = household.id;
    });
  })

  .then(function() {
    //add lyanna to targaryen house
    return db.User.update({householdId: householdIds['Targaryen']}, {where: {username: 'rhaegar'}});
  })

  .then(function() {
    //add lyanna to targaryen house
    return db.User.update({householdId: householdIds['Targaryen']}, {where: {username: 'lyanna'}});
  })

  .then(function() {
    //add jon to stark house
    return db.User.update({householdId: householdIds['Stark']}, {where: {username: 'jonSnow'}});
  })

  .then(function() {
    //add jon to stark house
    return db.User.update({householdId: householdIds['Stark']}, {where: {username: 'brandon'}});
  })

  //invite Dany to both houses
  .then(function() {
    return db.Invitation.create({
      toUserId: userIds['danyTarg'],
      fromUserId: userIds['brandon'],
      householdId: householdIds['Stark'],
      householdName: 'Stark',
    });
  })

  .then(function() {
    return db.Invitation.create({
      toUserId: userIds['danyTarg'],
      fromUserId: userIds['rhaegar'],
      householdId: householdIds['Targaryen'],
      householdName: 'Targaryen',
    });
  })

  .then(function() {
    //add items
    //household 1 has users 1 and 4
    //household 2 has users 2 and 3
    return db.Item.bulkCreate([
      {
        description: 'valyrian steel',
        householdId: householdIds['Stark'],
        addingUserId: userIds['brandon'],
        buyingUserId: userIds['brandon'],
        bought: true,
        price: (Math.random() * 10000),
      },
      {
        description: 'boiled leather',
        householdId: householdIds['Stark'],
        addingUserId: userIds['brandon'],
      },
      {
        description: 'dragon glass',
        householdId: householdIds['Stark'],
        addingUserId: userIds['jonSnow'],
      },
      {
        description: 'albino wolf cub',
        householdId: householdIds['Stark'],
        addingUserId: userIds['jonSnow'],
        buyingUserId: userIds['jonSnow'],
        bought: true,
        price: (Math.random() * 10000),
      },
      {
        description: 'dragon eggs',
        householdId: householdIds['Targaryen'],
        addingUserId: userIds['lyanna'],
        buyingUserId: userIds['lyanna'],
        bought: true,
        price: (Math.random() * 10000),
      },
      {
        description: 'crown of gold',
        householdId: householdIds['Targaryen'],
        addingUserId: userIds['rhaegar'],
      },
      {
        description: 'dragon\'s blood',
        householdId: householdIds['Targaryen'],
        addingUserId: userIds['rhaegar'],
        buyingUserId: userIds['rhaegar'],
        bought: true,
        price: (Math.random() * 10000),
      },
    ]);
  })

  .then(function() {
    //reckon the Starks
    return reckon(1);
  })

  .then(function() {
    //reckon the Targaryens
    return reckon(2);
  })

  .then(function() {
    //now add more items that won't have been reckoned
    //household 1 has users 1 and 4
    //household 2 has users 2 and 3
    return db.Item.bulkCreate([
      {
        description: 'Needle',
        householdId: householdIds['Stark'],
        addingUserId: userIds['brandon'],
        buyingUserId: userIds['jonSnow'],
        bought: true,
        price: (Math.random() * 10000),
      },
      {
        description: 'Ice',
        householdId: householdIds['Stark'],
        addingUserId: userIds['brandon'],
      },
      {
        description: 'Blackfyre',
        householdId: householdIds['Stark'],
        addingUserId: userIds['brandon'],
      },
      {
        description: 'Bright Roar',
        householdId: householdIds['Stark'],
        addingUserId: userIds['jonSnow'],
        buyingUserId: userIds['jonSnow'],
        bought: true,
        price: (Math.random() * 10000),
      },
      {
        description: 'Dark Sister',
        householdId: householdIds['Targaryen'],
        addingUserId: userIds['lyanna'],
        buyingUserId: userIds['lyanna'],
        bought: true,
        price: (Math.random() * 10000),
      },
      {
        description: 'Dawn',
        householdId: householdIds['Targaryen'],
        addingUserId: userIds['rhaegar'],
      },
      {
        description: 'Heartsbane',
        householdId: householdIds['Targaryen'],
        addingUserId: userIds['rhaegar'],
      },
    ]);
  })

  .then(function() {
    //reckon the Starks
    return reckon(1);
  })

  .then(function() {
    //reckon the Targaryens
    return reckon(2);
  })

  .then(function() {
    //now add more items that won't have been reckoned
    //household 1 has users 1 and 4
    //household 2 has users 2 and 3
    return db.Item.bulkCreate([
      {
        description: 'Lady Forlorn',
        householdId: householdIds['Stark'],
        addingUserId: userIds['brandon'],
        buyingUserId: userIds['jonSnow'],
        bought: true,
        price: (Math.random() * 10000),
      },
      {
        description: 'Oathkeeper',
        householdId: householdIds['Stark'],
        addingUserId: userIds['brandon'],
      },
      {
        description: 'Nightfall',
        householdId: householdIds['Stark'],
        addingUserId: userIds['brandon'],
      },
      {
        description: 'Red Rain',
        householdId: householdIds['Stark'],
        addingUserId: userIds['jonSnow'],
        buyingUserId: userIds['jonSnow'],
        bought: true,
        price: (Math.random() * 10000),
      },
      {
        description: 'Widow\'s Wail',
        householdId: householdIds['Targaryen'],
        addingUserId: userIds['lyanna'],
        buyingUserId: userIds['lyanna'],
        bought: true,
        price: (Math.random() * 10000),
      },
      {
        description: 'Lamentation',
        householdId: householdIds['Targaryen'],
        addingUserId: userIds['rhaegar'],
      },
      {
        description: 'Vigilance',
        householdId: householdIds['Targaryen'],
        addingUserId: userIds['rhaegar'],
      },
    ]);
  })

  .catch(function(error) {
    console.error(error);
  });
};

module.exports = seed;
