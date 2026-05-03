const { Router } = require('express');
const { authenticateUser } = require('../middleware/authenticationMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');
const { pointSchema } = require('../validator/pointValidator');
const { authorizeRole } = require('../middleware/roleMiddleware');
const pointController = require('../controller/pointController');

const router = Router();

router.get('/', authenticateUser, authorizeRole('admin'),pointController.getAllPoints);

router.get('/:id', authenticateUser, authorizeRole('admin'), pointController.getPointById);

router.post('/', authenticateUser, authorizeRole('admin'), validateBody(pointSchema), pointController.createPoint);

router.put('/:id', authenticateUser, authorizeRole('admin'), validateBody(pointSchema), pointController.updatePoint);

router.patch('/:id/status', authenticateUser, authorizeRole('admin'), pointController.toggleStatus);

router.delete('/:id', authenticateUser, authorizeRole('admin'), pointController.deletePoint);

module.exports = router;