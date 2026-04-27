const Joi = require('joi');

const objectTypeSchema = Joi.object({
  name: Joi.string().max(100).required(),
  icon_marker: Joi.string().max(255).allow('', null),
  description: Joi.string().allow('', null)
});

module.exports = {
  objectTypeSchema
};