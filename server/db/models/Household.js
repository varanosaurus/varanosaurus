//HOUSEHOLD

var Sequelize = require('sequelize');

var config = {

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

module.exports = function(db) {
	return db.define('household', config.attributes, config.options);
};
