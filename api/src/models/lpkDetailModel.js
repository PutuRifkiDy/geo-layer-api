const pool = require('../config/database');

class LPKDetailModel {
  async getLPKDetails() {
    const query = {
      text: 'SELECT * FROM lpk_details',
    };

    const result = await pool.query(query);
    return result.rows;
  }

  async createLPKDetail(data, pointObjectId) {
    const { nilek_vin, no_izin_disnaker, akreditasi, nama_pimpinan, tahun_berdiri, kapasitas_siswa, fasilitas_asrama, is_sending_organization, target_negara, jam_operasional, telepon, whatsapp, email, website_sosmed } = data;
    
    const query = {
      text: `INSERT INTO lpk_details 
             (point_object_id, nilek_vin, no_izin_disnaker, akreditasi, nama_pimpinan, tahun_berdiri, kapasitas_siswa, fasilitas_asrama, is_sending_organization, target_negara, jam_operasional, telepon, whatsapp, email, website_sosmed) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      values: [pointObjectId, nilek_vin, no_izin_disnaker, akreditasi, nama_pimpinan, tahun_berdiri, kapasitas_siswa, fasilitas_asrama, is_sending_organization, target_negara, jam_operasional, telepon, whatsapp, email, website_sosmed]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async updateLPKDetail(id, data) {
    const { nilek_vin, no_izin_disnaker, akreditasi, nama_pimpinan, tahun_berdiri, kapasitas_siswa, fasilitas_asrama, is_sending_organization, target_negara, jam_operasional, telepon, whatsapp, email, website_sosmed } = data;
    
    const query = {
      text: `UPDATE lpk_details SET 
             nilek_vin = $1, no_izin_disnaker = $2, akreditasi = $3, nama_pimpinan = $4, tahun_berdiri = $5, kapasitas_siswa = $6, fasilitas_asrama = $7, is_sending_organization = $8, target_negara = $9, jam_operasional = $10, telepon = $11, whatsapp = $12, email = $13, website_sosmed = $14
             WHERE id = $15 RETURNING *`,
      values: [nilek_vin, no_izin_disnaker, akreditasi, nama_pimpinan, tahun_berdiri, kapasitas_siswa, fasilitas_asrama, is_sending_organization, target_negara, jam_operasional, telepon, whatsapp, email, website_sosmed, id]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async deleteLPKDetail(id) {
    const query = {
      text: 'DELETE FROM lpk_details WHERE id = $1 RETURNING *',
      values: [id]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }
}

module.exports = new LPKDetailModel();