const mongoose = require('mongoose');
const env = require('../../env'); // Pastikan path ke file env benar

const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${env.mongoose.username}:${env.mongoose.password}@${env.mongoose.host}/${env.mongoose.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };
  
module.exports = connectDB;
// const conn = mongoose.connection;

// // Membuat URI MongoDB
// const mongoURI = `mongodb://${env.mongoose.username}:${env.mongoose.password}@${env.mongoose.host}/${env.mongoose.database}`;

// // Menghubungkan ke MongoDB
// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000, // Timeout setelah 5 detik
//     socketTimeoutMS: 45000,
// })
// .then(() => {
//     console.log("MongoDB connected successfully");
// })
// .catch((err) => {
//     console.error("MongoDB connection error:", err);
// });

// // Menangani event error dan open
// conn.on("error", console.error.bind(console, "MongoDB connection error:"));
// conn.once("open", () => console.log("Connected to MongoDB"));

// // Mengekspor instance koneksi (opsional)
// module.exports = conn;