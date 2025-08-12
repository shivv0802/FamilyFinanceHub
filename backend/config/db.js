const mongoose = require('mongoose');

async function connectDb(url) {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(url); // no extra options needed in Mongoose 7+
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // Stop app if DB is not connected
  }
}

module.exports = connectDb;
