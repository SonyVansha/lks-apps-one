const mongoose = require('mongoose');
const env = require('../../env'); // Pastikan path ke file env benar

// URL koneksi MongoDB lokal atau non-AWS
const localUrl = `mongodb+srv://sony:adminsony@cluster0.peb7z.mongodb.net/test`;
const uri = "mongodb+srv://sony:adminsony@cluster0.peb7z.mongodb.net/test";

const conn      = mongoose.connection;

const mongoConn = mongoose.connect(`mongodb+srv://${env.mongoose.host}:${env.mongoose.port || "27017"}/${env.mongoose.database}`, {
    auth: { "authSource": "admin" },
    user: env.mongoose.username,
    pass: env.mongoose.password,
    useNewUrlParser: true,
    // serverSelectionTimeoutMS: 30000,
    // useUnifiedTopology: true, 
    // useCreateIndex: true,
    // useFindAndModify: false,
    autoIndex: true
})
.then(() => {
  console.log('Koneksi ke MongoDB berhasil!');
})
.catch(err => {
  console.error('Koneksi ke MongoDB gagal:', err);
});

module.exports = mongoConn;