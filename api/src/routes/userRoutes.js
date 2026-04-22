const { Router } = require('express');
const { validateBody } = require('../middleware/validationMiddleware');
const { authenticateUser } = require('../middleware/authenticationMiddleware')
const { registerSchema, loginSchema, tokenAuthSchema, updateUserSchema } = require('../validator/userValidator');
const userController = require('../controller/userController');
const { authorizeRole } = require('../middleware/roleMiddleware');

const router = Router();

router.post('/', validateBody(registerSchema), userController.register);

router.get('/', authenticateUser, authorizeRole('admin'), userController.getAllUsers);

router.delete('/:id', authenticateUser, authorizeRole('admin'), userController.deleteUser);

router.get('/:id', authenticateUser, authorizeRole('admin'), userController.getUsersById);

router.patch('/:id', authenticateUser, authorizeRole('admin'), validateBody(updateUserSchema), userController.updateUserById);

router.post('/login', validateBody(loginSchema), userController.login);

router.put('/authentications', validateBody(tokenAuthSchema), userController.refresh);

router.delete('/authentications', validateBody(tokenAuthSchema), userController.logout);

module.exports = router;
