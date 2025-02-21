const { db, Sequelize } = require('../config/database/sequelize');

const Majors = db.define('majors', {
    majorsId: {
        type: Sequelize.INTEGER,
        primaryKey: true,  // Sesuai dengan PRIMARY KEY
        allowNull: false,  // Tidak boleh NULL
    },
    major_name: {
        type: Sequelize.STRING(50),  // Sesuai dengan VARCHAR(50)
        allowNull: true  // Bisa NULL, sesuai dengan definisi tabel
    }
}, {
    tableName: 'majors', // Pastikan nama tabel sesuai dengan database
    timestamps: false // Tidak menggunakan createdAt dan updatedAt
});

module.exports = Majors;
