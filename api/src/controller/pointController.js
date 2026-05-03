const pointModel = require('../models/pointModel');

class PointController {
  async getAllPoints(req, res) {
    try {
      const points = await pointModel.getAllPoints();

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

  async getActivePoints(req, res) {
    try {
      const { type_id } = req.query;
      const points = await pointModel.getActivePoints(type_id);

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

  async getPointById(req, res) {
    try {
      const { id } = req.params;
      const point = await pointModel.getPointById(id);

      if (!point) {
        return res.status(404).json({
          status: 'gagal',
          message: 'Point tidak ditemukan'
        });
      }

      res.status(200).json({
        status: 'berhasil',
        data: {
          point
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'gagal',
        message: 'Sistem kami ada error'
      })
    }
  }

  async createPoint(req, res) {
    try {
      const userId = req.user.id;
      const data = req.body;
      console.log(data);

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
      const data = req.body;
      console.log(data);

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

  async deletePoint(req, res) {
    try {
      const { id } = req.params;

      const deletedPoint = await pointModel.deletePoint(id);

      if (!deletedPoint) {
        return res.status(404).json({
          status: 'gagal',
          message: 'ID point tidak ditemukan'
        });
      }

      res.status(200).json({
        status: 'berhasil',
        message: 'Point berhasil dihapus'
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