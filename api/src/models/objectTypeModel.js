const pool = require("../config/database");

class ObjectTypeModel {
  async getAllObjectTypes() {
    const query = {
      text: 'SELECT * FROM master_object_types',
    };

    const result = await pool.query(query);
    return result.rows;
  }

  async verifyNameExists(name) {
    const query = {
      text: 'SELECT name FROM master_object_types WHERE name = $1',
      values: [name]
    };

    const result = await pool.query(query);
    return result.rows.length > 0;
  }

  async createObjectType(name, iconMarker, description) {
    const query = {
      text: 'INSERT INTO master_object_types (name, icon_marker, description) VALUES($1, $2, $3) RETURNING *',
      values: [name, iconMarker, description]
    }

    const result = await pool.query(query);
    if (result.rows.length == null) {
      throw new Error('Gagal membuat jenis objek');
    }
    return result.rows[0];
  }

  async updateObjectType(id, { name, iconMarker, description }) {
    const query = {
      text: `UPDATE master_object_types SET name = $1, icon_marker = COALESCE($2, icon_marker), description = $3 WHERE id = $4 RETURNING *`,
      values: [name, iconMarker, description, id]
    };

    const result = await pool.query(query);
    if (result.rows.length == 0) {
      throw new Error('Gagal memperbarui jenis objek, id tidak ditemukan');
    }
    return result.rows[0];
  }

  async deleteObjectType(id) {
    const query = {
      text: 'DELETE FROM master_object_types WHERE id = $1 RETURNING *',
      values: [id]
    };

    const result = await pool.query(query);
    if (result.rows.length == null) {
      throw new Error('Gagal menghapus jenis objek');
    }
    return result.rows[0];
  }
};

module.exports = new ObjectTypeModel();