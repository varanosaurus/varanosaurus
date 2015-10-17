//ITEM

var Sequelize = require('sequelize');

module.exports = {

	attributes: {

		description: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		details: Sequelize.TEXT,

		fetch: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},

		bought: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},

		price: {
			type: Sequelize.DECIMAL,
			// Do we want users to be able to add prices later, but require them for reckoning?
			allowNull: false,
			defaultValue: 0.0,
		},

		//name here is terrible
		timeFetched: Sequelize.DATE,

		timeBought: Sequelize.DATE,

		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

	},

	options: {},

};
