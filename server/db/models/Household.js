//HOUSEHOLD

var Sequelize = require('sequelize');

module.exports = {

	attributes: {

		name: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				// Should be alphanumeric + spaces
				is: ['^[a-z \\d]+$', 'i'],
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
