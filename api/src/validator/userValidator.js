const Joi = require('joi');

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'user').required()
});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const tokenAuthSchema = Joi.object({
  refreshToken: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchema,
  tokenAuthSchema,
  updateUserSchema
};