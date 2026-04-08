const { Router } = require('express');
const { validateBody } = require('../middleware/validationMiddleware');
const { authenticateUser } = require('../middleware/authenticationMiddleware')
const { registerSchema, loginSchema, tokenAuthSchema } = require('../validator/userValidator');
const userController = require('../controller/userController');

const router = Router();

router.post('/', validateBody(registerSchema), userController.register);

router.post('/login', validateBody(loginSchema), userController.login);
router.put('/authentications', validateBody(tokenAuthSchema), userController.refresh);
router.delete('/authentications', validateBody(tokenAuthSchema), userController.logout);

module.exports = router;
