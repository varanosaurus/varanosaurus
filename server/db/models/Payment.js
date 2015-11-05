var Sequelize = require('sequelize');

var config = {

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

module.exports = function(db) {
  return db.define('payment', config.attributes, config.options);
};
