var Sequelize = require('sequelize');

module.exports = {

  attributes: {

    seen: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    seenAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },

    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

  },

  options: {

  },

};
