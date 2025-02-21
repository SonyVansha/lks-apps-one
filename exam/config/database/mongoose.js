const mongoose = require('mongoose');
const env = require('../../env');

const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb://${env.mongoose.username}:${env.mongoose.password}@${env.mongoose.host}:${env.mongoose.port}`, {
        useNewUrlParser: true,
        autoIndex: true
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };
  
module.exports = connectDB;