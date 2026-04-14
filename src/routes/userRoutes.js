const { Router } = require('express');
const { validateBody } = require('../middleware/validationMiddleware');
const { authenticateUser } = require('../middleware/authenticationMiddleware')
const { registerSchema, loginSchema, tokenAuthSchema } = require('../validator/userValidator');
const userController = require('../controller/userController');

const router = Router();

// register user atau create user baru
router.post('/', validateBody(registerSchema), userController.register);

// login user
router.post('/login', validateBody(loginSchema), userController.login);

// perbarui refresh token
router.put('/authentications', validateBody(tokenAuthSchema), userController.refresh);

// delete refresh token atau logout
router.delete('/authentications', validateBody(tokenAuthSchema), userController.logout);

module.exports = router;
