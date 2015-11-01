//ITEM

var Sequelize = require('sequelize');

var config = {

	attributes: {

		description: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		details: {
			type: Sequelize.TEXT,
			defaultValue: null,
		},

		bought: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},

		price: {
			type: Sequelize.INTEGER,
			// Do we want users to be able to add prices later, but require them for reckoning?
			// allowNull: false,
			defaultValue: 0,
		},

		timeBought: {
			type: Sequelize.DATE,
			defaultValue: null,
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
	return db.define('item', config.attributes, config.options);
};
