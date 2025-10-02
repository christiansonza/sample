const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no options needed
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = db;
