var Sequelize = require('sequelize');

var config = require('./postgres.config.js');
var url = process.env.DATABASE_URL; //SET THIS UP PROPERLY SOON

var dbEnvironment = process.env.NODE_ENV;

if (dbEnvironment === 'test') {
  schema = config.testSchema;
} else {
  schema = config.mainSchema;
}