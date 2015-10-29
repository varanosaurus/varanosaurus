
var seed = function() {
  //this is required here so that db is defined
  //by the time the require happens
  var db = require('./interface');
  var reckon = require('../services/reckon');

  return db.User.bulkCreate([
    {
      username: 'brandon',
      password: 'password',
      //id 1
    },
    {
      username: 'lyanna',
      password: 'password',
      //id 2
    },
    {
      username: 'rhaegar',
      password: 'password',
      //id 3
    },
    {
      username: 'jonSnow',
      password: 'password',
      //id 4
    },
    {
      username: 'danyTarg',
      password: 'password',
      //id 5
    },
  ], {individualHooks: true})

  .then(function() {

    return db.Household.bulkCreate([
      {
        name: 'Stark',
        creatorId: 1,
        //id 1
      },
      {
        name: 'Targaryen',
        creatorId: 3,
        //id 2
      },
    ]);
  })

  .then(function() {
    //add lyanna to targaryen house
    return db.User.update({householdId: 2}, {where: {username: 'rhaegar'}});
  })

  .then(function() {
    //add lyanna to targaryen house
    return db.User.update({householdId: 2}, {where: {username: 'lyanna'}});
  })

  .then(function() {
    //add jon to stark house
    return db.User.update({householdId: 1}, {where: {username: 'jonSnow'}});
  })

  .then(function() {
    //add jon to stark house
    return db.User.update({householdId: 1}, {where: {username: 'brandon'}});
  })

  //invite Dany to both houses
  .then(function() {
    return db.Invitation.create({toUserId: 5, fromUserId: 1, householdId: 1});
  })

  .then(function() {
    return db.Invitation.create({toUserId: 5, fromUserId: 3, householdId: 2});
  })

  .then(function() {
    //add items
    //household 1 has users 1 and 4
    //household 2 has users 2 and 3
    return db.Item.bulkCreate([
      {
        description: 'valyrian steel',
        householdId: 1,
        addingUserId: 1,
        buyingUserId: 1,
        bought: true,
        price: (Math.random() * 100.00).toFixed(2),
      },
      {
        description: 'boiled leather',
        householdId: 1,
        addingUserId: 1,
      },
      {
        description: 'dragon glass',
        householdId: 1,
        addingUserId: 4,
      },
      {
        description: 'albino wolf cub',
        householdId: 1,
        addingUserId: 4,
        buyingUserId: 4,
        bought: true,
        price: (Math.random() * 100.00).toFixed(2),
      },
      {
        description: 'dragon eggs',
        householdId: 2,
        addingUserId: 2,
        buyingUserId: 2,
        bought: true,
        price: (Math.random() * 100.00).toFixed(2),
      },
      {
        description: 'crown of gold',
        householdId: 2,
        addingUserId: 3,
      },
      {
        description: 'dragon\'s blood',
        householdId: 2,
        addingUserId: 3,
        buyingUserId: 3,
        bought: true,
        price: (Math.random() * 100.00).toFixed(2),
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
        householdId: 1,
        addingUserId: 1,
        buyingUserId: 4,
        bought: true,
        price: (Math.random() * 100.00).toFixed(2),
      },
      {
        description: 'Ice',
        householdId: 1,
        addingUserId: 1,
      },
      {
        description: 'Blackfyre',
        householdId: 1,
        addingUserId: 1,
      },
      {
        description: 'Bright Roar',
        householdId: 1,
        addingUserId: 4,
        buyingUserId: 4,
        bought: true,
        price: (Math.random() * 100.00).toFixed(2),
      },
      {
        description: 'Dark Sister',
        householdId: 2,
        addingUserId: 2,
        buyingUserId: 2,
        bought: true,
        price: (Math.random() * 100.00).toFixed(2),
      },
      {
        description: 'Dawn',
        householdId: 2,
        addingUserId: 3,
      },
      {
        description: 'Heartsbane',
        householdId: 2,
        addingUserId: 3,
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
        householdId: 1,
        addingUserId: 1,
        buyingUserId: 4,
        bought: true,
        price: (Math.random() * 100.00).toFixed(2),
      },
      {
        description: 'Oathkeeper',
        householdId: 1,
        addingUserId: 1,
      },
      {
        description: 'Nightfall',
        householdId: 1,
        addingUserId: 1,
      },
      {
        description: 'Red Rain',
        householdId: 1,
        addingUserId: 4,
        buyingUserId: 4,
        bought: true,
        price: (Math.random() * 100.00).toFixed(2),
      },
      {
        description: 'Widow\'s Wail',
        householdId: 2,
        addingUserId: 2,
        buyingUserId: 2,
        bought: true,
        price: (Math.random() * 100.00).toFixed(2),
      },
      {
        description: 'Lamentation',
        householdId: 2,
        addingUserId: 3,
      },
      {
        description: 'Vigilance',
        householdId: 2,
        addingUserId: 3,
      },
    ]);
  })

  .catch(function(error) {
    console.error(error);
  });
};

module.exports = seed;

