//USER

var Sequelize = require('sequelize');
var Bluebird = require('bluebird');
var bcrypt = Bluebird.promisifyAll(require('bcrypt-nodejs'));
//issue installing bcrypt on Naomi's computer - check XCode permissions?

var hashPassword(user) {
	return bcrypt.hashAsync(user.password, null, null)
		.then(function(hash) {
			user.password = hash;
		});
};

var comparePassword(password) {
	return bcrypt.compareAsync(password, this.password);
};

module.exports = {
	
	attributes: {

		username: {
			type: Sequelize.STRING,
			allowNull: false
		},

		password: {
			type: Sequelize.STRING,
			allowNull: false
		},

		name: {
			type: Sequelize.STRING
		}

		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true;
		}

	},

	options: {

		hooks: {
			beforeCreate: hashPassword,
			beforeUpdate: hashPassword
		},

		instanceMethods: {
			comparePassword: comparePassword
		}

	}

};