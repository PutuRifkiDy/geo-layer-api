const Joi = require('joi');

const lpkDetailSchema = Joi.object({
  nilek_vin: Joi.string().max(50).allow('', null),
  no_izin_disnaker: Joi.string().max(100).allow('', null),
  akreditasi: Joi.string().max(50).allow('', null),
  nama_pimpinan: Joi.string().max(150).allow('', null),
  tahun_berdiri: Joi.number().integer().min(1900).max(new Date().getFullYear()).allow(null),
  kapasitas_siswa: Joi.number().integer().min(0).allow(null),
  fasilitas_asrama: Joi.boolean(),
  is_sending_organization: Joi.boolean(),
  target_negara: Joi.string().max(100).allow('', null),
  jam_operasional: Joi.string().max(150).allow('', null),
  telepon: Joi.string().max(20).allow('', null),
  whatsapp: Joi.string().max(20).allow('', null),
  email: Joi.string().email().max(100).allow('', null),
  website_sosmed: Joi.string().max(150).allow('', null)
}).required();

module.exports = {
  lpkDetailSchema
};