var Sequelize = require('sequelize');

module.exports = {

  attributes: {

    amount: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false,
    },

    isPaid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

  },

  options: {},

};
