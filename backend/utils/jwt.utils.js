const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(payload, expiresIn = '1h') {
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

module.exports = { generateToken };
