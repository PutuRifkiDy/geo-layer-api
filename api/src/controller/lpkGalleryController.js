const lpkGalleryModel = require('../models/lpkGalleryModel');
const fs = require('fs');
const path = require('path');

class LPKGalleryController {
  async getLPKGalleries(req, res) {
    try {
      const lpkGalleries = await lpkGalleryModel.getLPKGalleries();

      res.status(200).json({
        status: 'berhasil',
        data: {
          lpkGalleries
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

  async createLPKGallery(req, res) {
    try {
      const { pointObjectId } = req.params;
      const imageUrl = req.file ? req.file.filename : null;
      const { caption, isPrimary } = req.body;

      const newLPKGallery = await lpkGalleryModel.createLPKGallery(pointObjectId, { imageUrl, caption, isPrimary });

      res.status(201).json({
        status: 'berhasil',
        message: 'Gambar LPK berhasil ditambahkan',
        data: {
          newLPKGallery
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

  async updateLPKGallery(req, res) {
    try {
      const { id } = req.params;
      const { caption, isPrimary } = req.body;
      const imageUrl = req.file ? req.file.filename : null;

      const updatedLPKGallery = await lpkGalleryModel.updateLPKGallery(id, { imageUrl, caption, isPrimary });

      if (!updatedLPKGallery) {
        return res.status(404).json({
          status: 'gagal',
          message: 'ID LPK Gallery tidak ditemukan'
        });
      }

      res.status(200).json({
        status: 'berhasil',
        message: 'Gambar LPK berhasil diperbarui',
        data: {
          updatedLPKGallery
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

  async deleteLPKGallery(req, res) {
    try {
      const { id } = req.params;

      const deletedLPKGallery = await lpkGalleryModel.deleteLPKGallery(id);

      if (!deletedLPKGallery) {
        return res.status(404).json({
          status: 'gagal',
          message: 'ID LPK Gallery tidak ditemukan'
        });
      }

      // gabungin path di lokal sama path di database
      const filePath = path.join(__dirname, '../../public/images', this.deletedLPKGallery.image_url);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.status(200).json({
        status: 'berhasil',
        message: 'Gambar LPK berhasil dihapus'
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

module.exports = new LPKGalleryController();