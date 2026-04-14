const Joi = require('joi');

const pointSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  address: Joi.string().allow('', null),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  icon: Joi.string().allow('', null),
  owner: Joi.string().allow('', null),
  description: Joi.string().allow('', null),
  is_active: Joi.boolean()
});

module.exports = {
  pointSchema
};