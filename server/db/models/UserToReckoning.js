// User to Reckoning join table with additional related data:
// `contribution`: total cost of shared items purchased by user at time of reckoning.
// `debt`: household total costs divided by number of users, minus contribution.
// Negative debt indicates money owed to user by other members of household.

var Sequelize = require('sequelize');

module.exports = {

  attributes: {

    contribution: {
      type: Sequelize.DECIMAL(5, 2),
      validate: {
        min: 0,
      },
      defaultValue: 0.0,
    },

    debt: {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0.0,
    },

  },

  options: {},

};
