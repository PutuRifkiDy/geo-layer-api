const pool = require('../config/database');

class LPKProgramModel {
  async getLPKPrograms() {
    const query = {
      text: 'SELECT * FROM lpk_programs',
    };

    const result = await pool.query(query);
    return result.rows;
  }

  async createLPKProgram(data, pointObjectId) {
    const { nama_program, durasi_bulan, target_bahasa, estimasi_biaya, deskripsi_program } = data;

    const query = {
      text: `INSERT INTO lpk_programs (point_object_id, nama_program, durasi_bulan, target_bahasa, estimasi_biaya, deskripsi_program)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [pointObjectId, nama_program, durasi_bulan, target_bahasa, estimasi_biaya, deskripsi_program]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async updateLPKProgram(id, data) {
    const { nama_program, durasi_bulan, target_bahasa, estimasi_biaya, deskripsi_program } = data;

    const query = {
      text: `UPDATE lpk_programs SET
              nama_program = $1, 
              durasi_bulan = $2,
              target_bahasa = $3,
              estimasi_biaya = $4,
              deskripsi_program = $5
            WHERE id = $6 RETURNING *`,
      values: [nama_program, durasi_bulan, target_bahasa, estimasi_biaya, deskripsi_program, id]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async deleteLPKProgram(id) {
    const query = {
      text: 'DELETE FROM lpk_programs WHERE id = $1 RETURNING *',
      values: [id]
    };

    const result = await pool.query(query);
    return result.rows[0];
  }
};

module.exports = new LPKProgramModel();