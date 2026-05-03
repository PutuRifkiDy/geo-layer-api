const pool = require('../config/database');

class PointModel {
  async getAllPoints() {
    const query = {
      text: `
        SELECT 
          po.*, 
          mot.name AS type_name, 
          u.username AS created_by
        FROM point_objects po
        LEFT JOIN master_object_types mot ON po.type_id = mot.id
        LEFT JOIN users u ON po.created_by = u.id
      `
    };

    const result = await pool.query(query);
    return result.rows;
  }

  async getActivePoints(type_id) {
    let query = `
      SELECT 
        po.*, 
        mot.name AS type_name, 
        u.username AS created_by
      FROM point_objects po
      LEFT JOIN master_object_types mot ON po.type_id = mot.id
      LEFT JOIN users u ON po.created_by = u.id
      WHERE po.is_active = true
    `;
    const values = [];

    if (type_id) {
      query += ` AND po.type_id = $1`;
      values.push(type_id);
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

  async createPoint(data, userId) {
    const { type_id, name, address, latitude, longitude, is_active } = data;
    const query = {
      text: `INSERT INTO point_objects 
             (type_id, created_by, name, address, latitude, longitude, is_active) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      values: [type_id, userId, name, address, latitude, longitude, is_active]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async updatePoint(id, data) {
    const { type_id, name, address, latitude, longitude, is_active } = data;
    const query = {
      text: `UPDATE point_objects SET 
             type_id = $1, name = $2, address = $3, latitude = $4, longitude = $5, is_active = $6,
             updated_at = current_timestamp
             WHERE id = $7 RETURNING *`,
      values: [type_id, name, address, latitude, longitude, is_active, id]
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