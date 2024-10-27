const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/rudra';

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1); 
  }
};

module.exports = connectDB;
                                                                        