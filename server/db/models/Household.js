//HOUSEHOLD

var Sequelize = require('sequelize');

module.exports = {

	attributes: {

		name: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				isAlphanumeric: true,
			},
		},

		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

	},

	options: {},

};