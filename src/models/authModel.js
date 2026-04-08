const pool = require('../config/database');

class AuthModel {
  async addRefreshToken(token, userId) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    const query = {
      text: 'INSERT INTO refresh_tokens(token, user_id, expires_at) VALUES ($1, $2, $3)',
      values: [token, userId, expiresAt]
    };

    await pool.query(query);
  }

  async verifyTokenExists(token) {
    const query = {
      text: 'SELECT token FROM refresh_tokens WHERE token = $1',
      values: [token]
    };

    const result = await pool.query(query);
    if (result.rows.length === 0) {
      throw new Error('Token tidak ada di database');
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM refresh_tokens WHERE token = $1',
      values: [token]
    }

    await pool.query(query);
  }
}

module.exports = new AuthModel();