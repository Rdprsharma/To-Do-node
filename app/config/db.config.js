const mongoose = require('mongoose');

// MongoDB URL
const dbUrl = 'mongodb://localhost:27017/rudra';

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
                                                                        