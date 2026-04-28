const Joi = require('joi');

const pointSchema = Joi.object({
  type_id: Joi.number().integer().required(),
  name: Joi.string().required(),
  address: Joi.string().allow('', null),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  is_active: Joi.boolean().default(true)
});

module.exports = {
  pointSchema
};