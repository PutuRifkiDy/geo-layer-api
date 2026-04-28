const pool = require('../config/database');

class LPKGalleryModel {
  async getLPKGalleries() {
    const query = {
      text: 'SELECT * FROM lpk_galleries',
    };

    const result = await pool.query(query);
    return result.rows;
  }

  async createLPKGallery(pointObjectId, { imageUrl, caption, isPrimary }) {
    const query = {
      text: 'INSERT INTO lpk_galleries (point_object_id, image_url, caption, is_primary) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [pointObjectId, imageUrl, caption, isPrimary]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async updateLPKGallery(id, { imageUrl, caption, isPrimary }) {
    const query = {
      text: 'UPDATE lpk_galleries SET image_url = COALESCE($1, image_url), caption = $2, is_primary = $3 WHERE id = $4 RETURNING *',
      values: [imageUrl, caption, isPrimary, id]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async deleteLPKGallery(id) {
    const query = {
      text: 'DELETE FROM lpk_galleries WHERE id = $1 RETURNING *',
      values: [id]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }
};

module.exports = new LPKGalleryModel();