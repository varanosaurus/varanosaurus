//RECKONING

var Sequelize = require('sequelize');

module.exports = {

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
