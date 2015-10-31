var Sequelize = require('sequelize');

module.exports = {

  attributes: {

    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    isPaid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

  },

  options: {},

};
