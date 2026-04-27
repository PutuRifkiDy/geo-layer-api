const objectTypeModel = require("../models/objectTypeModel");

class ObjectTypeController {
  async getAllObjectTypes(req, res) {
    try {
      const objectTypes = await objectTypeModel.getAllObjectTypes();

      res.status(200).json({
        status: 'berhasil',
        data: {
          objectTypes
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

  async createObjectType(req, res) {
    try {
      const { name, description } = req.body;
      const iconMarker = req.file ? req.file.filename : null;
      const isNameExists = await objectTypeModel.verifyNameExists(name);

      if (isNameExists) {
        return res.status(409).json({
          status: 'gagal',
          message: 'Nama jenis objek sudah digunakan'
        });
      }

      const newObjectType = await objectTypeModel.createObjectType(name, iconMarker, description);

      res.status(201).json({
        status: 'berhasil',
        message: 'Jenis objek berhasil dibuat',
        data: {
          newObjectType
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

  async updateObjectType(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const iconMarker = req.file ? req.file.filename : null;

      const updatedObjectType = await objectTypeModel.updateObjectType(id, { name, iconMarker, description });

      res.status(200).json({
        status: 'berhasil',
        message: 'Jenis objek berhasil diperbarui',
        data: {
          updatedObjectType
        }
      });
    } catch (error) {
      console.log(error);

      if (error.message === 'Gagal memperbarui jenis objek, id tidak ditemukan') {
        return res.status(404).json({
          status: 'gagal',
          message: error.message
        });
      }

      res.status(500).json({
        status: 'gagal',
        message: 'Sistem kami ada error'
      });
    }
  }

  async deleteObjectType(req, res) {
    try {
      const { id } = req.params;

      const deleteObjectType = await objectTypeModel.deleteObjectType(id);

      res.status(200).json({
        status: 'berhasil',
        message: 'Jenis objek berhasil dihapus',
        data: {
          deleteObjectType
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
};

module.exports = new ObjectTypeController();