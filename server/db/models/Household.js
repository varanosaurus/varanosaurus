//HOUSEHOLD

var Sequelize = require('sequelize');

module.exports = {
	
	attributes: {

		name: {
			type: Sequelize.STRING,
			allowNull: false
		},

		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true;
		}

	},

	options: {};

};