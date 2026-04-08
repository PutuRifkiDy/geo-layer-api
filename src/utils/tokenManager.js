const jwt = require('jsonwebtoken');

class TokenManager {
  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_AGE || '15m',
    });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  }

  verifyAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      throw new Error('Access token tidak valid');
    }
  }

  verifyRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new Error('Refresh token tidak valid');
    }
  }
}

module.exports = new TokenManager();