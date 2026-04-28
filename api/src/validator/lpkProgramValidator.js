const Joi = require('joi');

const lpkProgramSchema = Joi.object({
  nama_program: Joi.string().max(150).required(),
  durasi_bulan: Joi.number().integer().min(0).required(),
  target_bahasa: Joi.string().max(50).required(),
  estimasi_biaya: Joi.string().max(100).required(),
  deskripsi_program: Joi.string().required()
});

module.exports = {
  lpkProgramSchema
};