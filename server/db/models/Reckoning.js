//RECKONING

var Sequelize = require('sequelize');

module.exports = {
	
	attributes: {

		totalSpent: {
			type: Sequelize.DECIMAL,
			allowNull: false
		}

		date: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},

		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true;
		}

	},

	options: {};

};