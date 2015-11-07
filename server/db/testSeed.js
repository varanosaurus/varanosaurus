
var seed = function() {
  //this is required here so that db is defined
  //by the time the require happens
  var db = require('./interface');
  var reckon = require('../services/reckon');

  var userIds = {};
  var householdIds = {};

  var randomDay = function() {
    return Math.floor(Math.random() * 30);
  };

  var Market = ['kylecho', 'amychiu', 'taylorleh', 'rodrigo'];
  var Natoma = ['naomij', 'cameron', 'garylovestea', 'dezzza'];

  var randomRoommate = function(household) {
    var name = household === 'Market' ? Market : Natoma;
    return name[Math.floor(Math.random() * name.length)];
  }

  return db.User.bulkCreate([
    {
      username: 'kylecho',
      password: 'password',
    },
    {
      username: 'naomij',
      password: 'password',
    },
    {
      username: 'cameron',
      password: 'password',
    },
    {
      username: 'amychiu',
      password: 'password',
    },
    {
      username: 'dezzza',
      password: 'password',
    },
    {
      username: 'garylovestea',
      password: 'password',
    },
    {
      username: 'taylorleh',
      password: 'password',
    },
    {
      username: 'alexhutch',
      password: 'password',
    },
    {
      username: 'rodrigo',
      password: 'password',
    },
  ], {returning: true, individualHooks: true})

  .then(function(users) {

    users.forEach(function(user) {
      userIds[user.username] = user.id;
    });

    return db.Household.bulkCreate([
      {
        name: '945 Market',
        creatorId: userIds['kylecho'],
      },
      {
        name: '431 Natoma',
        creatorId: userIds['cameron'],
      },
    ], {returning: true});
  })

  .then(function(households) {
    households.forEach(function(household) {
      householdIds[household.name] = household.id;
    });
  })

  .then(function() {
    //add cameron to 431 Natoma house
    return db.User.update({householdId: householdIds['431 Natoma']}, {where: {username: 'cameron'}});
  })

  .then(function() {
    //add naomij to 431 Natoma house
    return db.User.update({householdId: householdIds['431 Natoma']}, {where: {username: 'naomij'}});
  })

  .then(function() {
    //add dezzza to 431 Natoma house
    return db.User.update({householdId: householdIds['431 Natoma']}, {where: {username: 'dezzza'}});
  })

  .then(function() {
    //add garylovestea to 431 Natoma house
    return db.User.update({householdId: householdIds['431 Natoma']}, {where: {username: 'garylovestea'}});
  })

  .then(function() {
    //add amychiu to 945 Market house
    return db.User.update({householdId: householdIds['945 Market']}, {where: {username: 'amychiu'}});
  })

  .then(function() {
    //add kylecho to 945 Market house
    return db.User.update({householdId: householdIds['945 Market']}, {where: {username: 'kylecho'}});
  })

  .then(function() {
    //add taylorleh to 945 Market house
    return db.User.update({householdId: householdIds['945 Market']}, {where: {username: 'taylorleh'}});
  })

  .then(function() {
    //add rodrigo to 945 Market house
    return db.User.update({householdId: householdIds['945 Market']}, {where: {username: 'rodrigo'}});
  })

  //invite alexhutch to both houses
  .then(function() {
    return db.Invitation.create({
      toUserId: userIds['alexhutch'],
      fromUserId: userIds['kylecho'],
      householdId: householdIds['945 Market'],
      householdName: '945 Market',
    });
  })

  .then(function() {
    return db.Invitation.create({
      toUserId: userIds['alexhutch'],
      fromUserId: userIds['cameron'],
      householdId: householdIds['431 Natoma'],
      householdName: '431 Natoma',
    });
  })

  .then(function() {
    //add items
    //household Natoma has users cameron, naomij, dezzza, and garylovestea
    //household Market has users amychiu, kylecho, taylorleh, and rodrigo
    return db.Item.bulkCreate([
      {
        description: 'eggs',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 08, randomDay()),
      },
      {
        description: 'milk',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
      },
      {
        description: 'bread',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
      },
      {
        description: 'toilet paper',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 08, randomDay()),
      },
      {
        description: 'paper towels',
        householdId: householdIds['431 Natoma'],
        addingUserId: userIds[randomRoommate('Natoma')],
        buyingUserId: userIds[randomRoommate('Natoma')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 08, randomDay()),
      },
      {
        description: 'solo cups',
        householdId: householdIds['431 Natoma'],
        addingUserId: userIds[randomRoommate('Natoma')],
      },
      {
        description: 'dishwasher soap stuff',
        householdId: householdIds['431 Natoma'],
        addingUserId: userIds[randomRoommate('Natoma')],
        buyingUserId: userIds[randomRoommate('Natoma')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 08, randomDay()),
      },
    ]);
  })

  .then(function() {
    //reckon the Starks
    return reckon(householdIds['945 Market'], new Date(2015, 08, 30));
  })

  .then(function() {
    //reckon the Targaryens
    return reckon(householdIds['431 Natoma'], new Date(2015, 08, 30));
  })

  .then(function() {
    //now add more items that won't have been reckoned
    //household 1 has users 1 and 4
    //household 2 has users 2 and 3
    return db.Item.bulkCreate([
      {
        description: 'beer',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 09, randomDay()),
      },
      {
        description: 'good beer',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
      },
      {
        description: 'bananas',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
      },
      {
        description: 'papayas',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 09, randomDay()),
      },
      {
        description: 'eggs',
        householdId: householdIds['431 Natoma'],
        addingUserId: userIds[randomRoommate('Natoma')],
        buyingUserId: userIds[randomRoommate('Natoma')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 09, randomDay()),
      },
      {
        description: 'milk',
        householdId: householdIds['431 Natoma'],
        addingUserId: userIds[randomRoommate('Natoma')],
      },
      {
        description: 'bread',
        householdId: householdIds['431 Natoma'],
        addingUserId: userIds[randomRoommate('Natoma')],
      },
    ]);
  })

  .then(function() {
    //reckon the Starks
    return reckon(householdIds['945 Market'], new Date(2015, 09, 30));
  })

  .then(function() {
    //reckon the Targaryens
    return reckon(householdIds['431 Natoma'], new Date(2015, 09, 30));
  })

  .then(function() {
    //now add more items that won't have been reckoned
    //household 1 has users 1 and 4
    //household 2 has users 2 and 3
    return db.Item.bulkCreate([
      {
        description: 'sponges',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 10, randomDay()),
      },
      {
        description: 'dish soap',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
      },
      {
        description: 'broom',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
      },
      {
        description: 'cheese',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 10, randomDay()),
      },
      {
        description: 'milk',
        householdId: householdIds['431 Natoma'],
        addingUserId: userIds[randomRoommate('Natoma')],
        buyingUserId: userIds[randomRoommate('Natoma')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 10, randomDay()),
      },
      {
        description: 'bread',
        householdId: householdIds['431 Natoma'],
        addingUserId: userIds[randomRoommate('Natoma')],
      },
      {
        description: 'matches',
        householdId: householdIds['431 Natoma'],
        addingUserId: userIds[randomRoommate('Natoma')],
      },
      {
        description: 'milk',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 10, randomDay()),
      },
      {
        description: 'bananas',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 10, randomDay()),
      },
      {
        description: 'Red Powerade',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 10, randomDay()),
      },
      {
        description: 'Soju',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 10, randomDay()),
      },
      {
        description: 'Kimchi',
        householdId: householdIds['945 Market'],
        addingUserId: userIds[randomRoommate('Market')],
        buyingUserId: userIds[randomRoommate('Market')],
        bought: true,
        price: (Math.random() * 10000),
        timeBought: new Date(2015, 10, randomDay()),
      },
    ]);
  })

  .catch(function(error) {
    console.error(error);
  });
};

module.exports = seed;
