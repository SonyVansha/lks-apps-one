const Sequelize = require("sequelize");
const env = require('../../env');

// Pastikan env.sequelize sudah memiliki properti yang sesuai
const db = new Sequelize(env.sequelize.database, env.sequelize.username, env.sequelize.password, {
    host: env.sequelize.host,
    dialect: env.db_type || 'mysql', // pastikan db_type terisi dengan benar
    logging: false, // matikan logging query jika tidak perlu
});

const dbConn = db.authenticate().then(() => {
    console.log("Successfully connected to the database.");
    return true;
}).catch(err => {
    console.error(`Failed to connect to the database: ${err.message}`);
    return false;
});

module.exports = { db, dbConn, Sequelize };
