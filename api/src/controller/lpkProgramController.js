const lpkProgramModel = require('../models/lpkProgramModel');

class LPKProgramController {
  async getLPKPrograms(req, res) {
    try {
      const lpkPrograms = await lpkProgramModel.getLPKPrograms();

      res.status(200).json({
        status: 'berhasil',
        data: {
          lpkPrograms,
        }
      })
    } catch (error) {
      console.log(error);

      res.status(500).json({
        status: 'gagal',
        message: 'Maaf sistem kami mengalami error'
      });
    }
  }

  async createLPKPrograms(req, res) {
    try {
      const data = req.body;
      const { pointObjectId } = req.params;

      const newLPKProgram = await lpkProgramModel.createLPKProgram(data, pointObjectId);

      res.status(201).json({
        status: 'berhasil',
        message: 'LPK Program berhasil ditambahkan',
        data: {
          newLPKProgram,
        }
      })
    } catch (error) {
      console.log(error);

      res.status(500).json({
        status: 'gagal',
        message: 'Terjadi error pada sistem kami'
      });
    }
  }

  async updateLPKProgram(req, res) {
    try {
      const data = req.body;
      console.log(data);
      const { id } = req.params;

      const updatedLPKProgram = await lpkProgramModel.updateLPKProgram(id, data);

      if (!updatedLPKProgram) {
        return res.status(404).json({
          status: 'gagal',
          message: 'LPK Program tidak ditemukan'
        });
      }

      res.status(200).json({
        status: 'berhasil',
        message: 'LPK Program berhasil diperbarui',
        data: {
          updatedLPKProgram
        }
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        status: 'gagal',
        message: 'Terjadi error pada sistem kami'
      });
    }
  }

  async deleteLPKProgram(req, res) {
    try {
      const { id } = req.params;

      const deleteLPKProgram = await lpkProgramModel.deleteLPKProgram(id);

      if (!deleteLPKProgram) {
        res.status(404).json({
          status: 'gagal',
          message: 'LPK Program tidak ditemukan'
        });
      }

      res.status(200).json({
        status: 'berhasil',
        message: 'LPK Program berhasil dihapus',
        data: {
          deleteLPKProgram
        }
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        status: 'gagal',
        message: 'Terjadi error pada sistem kami'
      });
    }
  }
};

module.exports = new LPKProgramController();