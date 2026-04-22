const pool = require('../config/database');

class UserModel {
  async createUser({ username, email, hashedPassword }) {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows[0]) {
      throw new Error('User dengan email ini sudah ada');
    }

    const query = {
      text: 'INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      values: [username, email, hashedPassword]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async verifyUsernameExists(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username]
    };

    const result = await pool.query(query);
    return result.rows.length > 0;
  }

  async getUserByEmail(email) {
    const query = {
      text: 'SELECT id, username, role, email, password FROM users WHERE email = $1',
      values: [email]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async getAllUsers() {
    const query = {
      text: 'SELECT * FROM users',
    };

    const result = await pool.query(query);
    return result.rows;
  }

  async deleteUserById(id) {
    const query = {
      text: 'DELETE FROM users WHERE id = $1',
      values: [id]
    };

    const result = await pool.query(query);
    if (!result.rowCount === 0) {
      throw new Error('User tidak ditemukan');
    }
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT id, username, email, role FROM users WHERE id = $1',
      values: [id]
    };

    const result = await pool.query(query);
    if (result.rows.length === 0) {
      throw new Error('User tidak ditemukan');
    }
    return result.rows[0];
  }

  async updateUserById(id, {username, email, role}) {
    const query = {
      text: 'UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4 RETURNING id, username, email, role',
      values: [username, email, role, id]
    };

    const result = await pool.query(query);
    if (result.rows.length === 0) {
      throw new Error('User tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = new UserModel();