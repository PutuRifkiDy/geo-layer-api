const pool = require('../config/database');

class PointModel {
  // user biasa bisa (public)
  async getActivePoints(type) {
    let query = 'SELECT * FROM point_objects WHERE is_active = true';
    const values = [];

    if (type) {
      query = query + ' AND type = $1';
      values.push(type);
    }

    const result = await pool.query(query, values);
    return result.rows;
  }

  async getPointById(id) {
    const query = {
      text: 'SELECT * FROM point_objects WHERE id = $1',
      values: [id]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  // hanya admin private
  async createPoint(data, userId) {
    const { name, type, address, latitude, longitude, icon, owner, description } = data;
    const query = {
      text: `INSERT INTO point_objects 
             (name, type, address, latitude, longitude, icon, owner, description, created_by) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      values: [name, type, address, latitude, longitude, icon, owner, description, userId]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async updatePoint(id, data) {
    const { name, type, address, latitude, longitude, icon, owner, description } = data;
    const query = {
      text: `UPDATE point_objects SET 
             name = $1, type = $2, address = $3, latitude = $4, longitude = $5, 
             icon = $6, owner = $7, description = $8, updated_at = current_timestamp
             WHERE id = $9 RETURNING *`,
      values: [name, type, address, latitude, longitude, icon, owner, description, id]
    };
    const result = await pool.query(query);
    return result.rows[0];
  }

  async toggleStatus(id, isActive) {
    const query = {
      text: 'UPDATE point_objects SET is_active = $1, updated_at = current_timestamp WHERE id = $2 RETURNING *',
      values: [isActive, id]
    }

    const result = await pool.query(query);
    return result.rows[0];
  }

  async deletePoint(id) {
    const query = {
      text: 'DELETE FROM point_objects WHERE id = $1 RETURNING *',
      values: [id]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }
}

module.exports = new PointModel();