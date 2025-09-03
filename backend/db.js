const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  console.log('✅ Successfully connected to MongoDB database.');
  } catch (err) {
  console.error('❌ Failed to connect to MongoDB. Please check your connection settings. Error:', err.message);
  process.exit(1);
  }
};

module.exports = connectDB;
