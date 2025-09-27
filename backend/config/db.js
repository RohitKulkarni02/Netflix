const { Sequelize } = require('sequelize');
const config = require('./settings');

// Create Sequelize instance
const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    logging: config.database.logging,
    pool: config.database.pool,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    },
    dialectOptions: {
      ssl: config.server.environment === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  }
);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    return false;
  }
};

// Sync database (use with caution in production)
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ Database synchronized successfully.');
    return true;
  } catch (error) {
    console.error('❌ Database synchronization failed:', error.message);
    return false;
  }
};

// Close database connection
const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed.');
    return true;
  } catch (error) {
    console.error('❌ Error closing database connection:', error.message);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase,
  closeConnection
};