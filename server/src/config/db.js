const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    // Don't exit in development — allow server to run without DB for testing
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    }
  }
}

module.exports = connectDB
