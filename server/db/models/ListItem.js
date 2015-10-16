//LIST ITEM

var Sequelize = require('sequelize');

module.exports = {
	
	attributes: {

		itemDescription: {
			type: Sequelize.STRING,
			allowNull: false
		},

		details: Sequelize.STRING,

		fetch: Sequelize.BOOLEAN,

		bought: Sequelize.BOOLEAN,

		addingUser: {
			//FK
			allowNull: false
		},

		fetchingUser: {
			//FK
		},

		buyingUser: {
			//FK
		},

		price: {
			type: Sequelize.DECIMAL,
			allowNull: false
		},

		timeAdded: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
		},

		//name here is terrible
		timeFetched: Sequelize.DATE,

		timeBought: Sequelize.DATE,

		reckoning: {
			//FK
			//nullable
		}

		household: {
			//put foreign key here
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