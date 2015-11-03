//USER

var Sequelize = require('sequelize');
var Bluebird = require('bluebird');
var bcrypt = Bluebird.promisifyAll(require('bcrypt-nodejs'));

var hashPassword = function(user) {
	return bcrypt.hashAsync(user.password, null, null)
		.then(function(hash) {
			user.password = hash;
		});
};

var comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

var config = {

	attributes: {

		username: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				// Must be between 4-12 chars long
				len: [4, 20],
				// Must be letters or numbers; case-insensitive for letters
				is: ['^[a-z_\\.\\d]+$', 'i'],
			},
		},

		password: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				// Must be min 6, max 28 chars
				len: [6, 28],
				// Must be letters, numbers, spaces, or exclamation/question marks
				is: ['^[a-z \\d!?]+$', 'i'],

			},
		},

		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

	},

	options: {

		hooks: {
			beforeCreate: hashPassword,
			beforeUpdate: hashPassword,
		},

		instanceMethods: {
			comparePassword: comparePassword,
		},

	},

};

module.exports = function(db) {
	return db.define('user', config.attributes, config.options);
};
