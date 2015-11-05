//RECKONING

var Sequelize = require('sequelize');

var config = {

	attributes: {

		totalSpent: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		date: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
		},

		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

	},

	options: {},

};

module.exports = function(db) {
	return db.define('reckoning', config.attributes, config.options);
};
