const config = require('./settings');
const { sequelize, testConnection, syncDatabase, closeConnection } = require('./db');

// Validate configuration on startup
config.validateConfig();

module.exports = {
  config,
  sequelize,
  testConnection,
  syncDatabase,
  closeConnection
};