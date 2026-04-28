const Joi = require('joi');

const lpkGallerySchema = Joi.object({
  // image_url: Joi.string().required(),
  caption: Joi.string().allow('', null),
  is_primary: Joi.boolean()
});

module.exports = {
  lpkGallerySchema
};