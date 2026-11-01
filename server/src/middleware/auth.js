const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  // Extract Bearer token from Authorization header
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Attach user to request (exclude password hash)
    req.user = await User.findById(decoded.id).select('-passwordHash')
    if (!req.user) {
      return res.status(401).json({ message: 'User not found.' })
    }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized. Token invalid or expired.' })
  }
}

module.exports = { protect }
