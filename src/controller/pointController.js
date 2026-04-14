const pointModel = require('../models/pointModel');

class PointController {
  async getPoints(req, res) {
    try {
      const { type } = req.query;
      const points = await pointModel.getActivePoints(type);

      res.status(200).json({
        status: 'berhasil',
        data: {
          points
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'gagal',
        message: 'Sistem kami ada error'
      });
    }
  }

  async createPoint(req, res) {
    try {
      const userId = req.user.id;
      const data = req.body;

      if (req.file) {
        data.icon = req.file.filename;
      }

      const newPoint = await pointModel.createPoint(data, userId);
      res.status(201).json({
        status: 'berhasil',
        message: 'Object point berhasil ditambahkan',
        data: {
          newPoint
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

  async updatePoint(req, res) {
    try {
      const { id } = req.params;
      const data = req.body

      if (req.file) {
        data.icon = req.file.filename;
      }

      const updatedPoint = await pointModel.updatePoint(id, data);

      if (!updatedPoint) {
        return res.status(404).json({
          status: 'gagal', message: 'Objek tidak ditemukan'
        });
      }

      res.status(200).json({
        status: 'berhasil',
        message: 'Data objek berhasil diperbarui',
        data: { point: updatedPoint }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'gagal',
        message: 'Terjadi error pada sistem kami'
      });
    }
  }

  async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      const { is_active } = req.body;

      const updatedPoint = await pointModel.toggleStatus(id, is_active);

      if (!updatedPoint) {
        return res.status(404).json({
          status: 'gagal',
          message: 'Object tidak ditemukan'
        });
      }

      res.status(200).json({
        status: 'berhasil',
        message: `Objek berhasil di${is_active ? 'tampilkan' : 'sembunyikan'}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'gagal',
        message: 'Terjadi error di sistem kami'
      });
    }
  }
}

module.exports = new PointController();