const lpkDetailModel = require('../models/lpkDetailModel');

class LPKDetailController {
  async getLPKDetails(req, res) {
    try {
      const lpkDetails = await lpkDetailModel.getLPKDetails();

      res.status(200).json({
        status: 'berhasil',
        data: {
          lpkDetails
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

  async createLPKDetail(req, res) {
    try {
      const data = req.body;
      const { pointObjectId } = req.params;

      const newLPKDetail = await lpkDetailModel.createLPKDetail(data, pointObjectId);
      
      res.status(201).json({
        status: 'berhasil',
        message: 'Detail LPK berhasil ditambahkan',
        data: {
          newLPKDetail
        }
      });
    } catch (error) {
      console.log(error);
      
      if (error.code === '23505') { 
        return res.status(409).json({
          status: 'gagal',
          message: 'Point Object ini sudah memiliki detail LPK'
        });
      }

      res.status(500).json({
        status: 'gagal',
        message: 'Terjadi error pada sistem kami'
      });
    }
  }

  async updateLPKDetail(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedLPKDetail = await lpkDetailModel.updateLPKDetail(id, data);

      if (!updatedLPKDetail) {
        return res.status(404).json({
          status: 'gagal', message: 'Detail LPK tidak ditemukan'
        });
      }

      res.status(200).json({
        status: 'berhasil',
        message: 'Detail LPK berhasil diperbarui',
        data: {
          updatedLPKDetail
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

  async deleteLPKDetail(req, res) {
    try {
      const { id } = req.params;
      const deletedLPKDetail = await lpkDetailModel.deleteLPKDetail(id);

      if (!deletedLPKDetail) {
        return res.status(404).json({
          status: 'gagal', message: 'Detail LPK tidak ditemukan'
        });
      }

      res.status(200).json({
        status: 'berhasil',
        message: 'Detail LPK berhasil dihapus',
        data: {
          deletedLPKDetail
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
}

module.exports = new LPKDetailController();