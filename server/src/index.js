require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

// ─── Connect to MongoDB ──────────────────────────────────
connectDB()

const app = express()

// ─── Middleware ──────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ─── Routes ─────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'))

// ─── Health Check ────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CellyGen API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
})

// ─── 404 Handler ────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found` })
})

// ─── Global Error Handler ────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

// ─── Start Server ────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 CellyGen API running on http://localhost:${PORT}`)
  console.log(`   Health: http://localhost:${PORT}/api/health`)
  console.log(`   Env: ${process.env.NODE_ENV || 'development'}`)
})
