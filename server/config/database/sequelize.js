const Sequelize = require("sequelize");
const env = require('../../env');

const db = new Sequelize(env.sequelize.database, env.sequelize.username, env.sequelize.password, {
    host: env.sequelize.host,
    dialect: env.db_type || 'mysql',
    logging: false,
    pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        connectTimeout: 60000 // Timeout koneksi (60 detik)
    }
});

const dbConn = db.authenticate().then(() => {
    console.log("Successfully connected to the database.");
    return true;
}).catch(err => {
    console.error(`Failed to connect to the database: ${err.message}`);
    return false;
});

module.exports = { db, dbConn, Sequelize };
