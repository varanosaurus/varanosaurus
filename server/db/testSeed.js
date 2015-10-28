
var seed = function() {
  //this is required here so that db is defined
  //by the time the require happens
  var db = require('./interface');
  var reckon = require('../services/reckon');

  return db.User.bulkCreate([
    {
      username: 'brandonStark',
      password: 'password',
      //id 1
    },
    {
      username: 'lyannaStark',
      password: 'password',
      //id 2
    },
    {
      username: 'rhaegarTargaryen',
      password: 'password',
      //id 3
    },
    {
      username: 'jonSnow',
      password: 'password',
      //id 4
    },
    {
      username: 'danaerysTargaryen',
      password: 'password',
      //id 5
    },
  ])

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
    return db.User.update({householdId: 2}, {where: {username: 'rhaegarTargaryen'}});
  })

  .then(function() {
    //add lyanna to targaryen house
    return db.User.update({householdId: 2}, {where: {username: 'lyannaStark'}});
  })

  .then(function() {
    //add jon to stark house
    return db.User.update({householdId: 1}, {where: {username: 'jonSnow'}});
  })

  .then(function() {
    //add jon to stark house
    return db.User.update({householdId: 1}, {where: {username: 'brandonStark'}});
  })

  .then(function() {
    //add items
    return db.Item.bulkCreate([
      {
        description: 'valyrian steel',
        householdId: 1,
        addingUserId: 1,
        buyingUserId: 2,
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
        addingUserId: 2,
        buyingUserId: 4,
      },
      {
        description: 'dragon eggs',
        householdId: 2,
        addingUserId: 2,
        buyingUserId: 2,
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
    return db.Item.bulkCreate([
      {
        description: 'Needle',
        householdId: 1,
        addingUserId: 1,
        buyingUserId: 2,
      },
      {
        description: 'Ice',
        householdId: 1,
        addingUserId: 1,
      },
      {
        description: 'Blackfyre',
        householdId: 1,
        addingUserId: 4,
      },
      {
        description: 'Bright Roar',
        householdId: 1,
        addingUserId: 2,
        buyingUserId: 4,
      },
      {
        description: 'Dark Sister',
        householdId: 2,
        addingUserId: 2,
        buyingUserId: 2,
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

  .catch(function(error) {
    console.error(error);
  });
};

module.exports = seed;
