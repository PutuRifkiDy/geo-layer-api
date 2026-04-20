const { Router } = require('express');
const { authenticateUser } = require('../middleware/authenticationMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');
const { pointSchema } = require('../validator/pointValidator');
const { authorizeRole } = require('../middleware/roleMiddleware');
const pointController = require('../controller/pointController');

const upload = require('../middleware/multer');

const router = Router();
router.get('/', pointController.getPoints);

router.post('/', authenticateUser, authorizeRole('admin'), upload.single('icon'), validateBody(pointSchema), pointController.createPoint);

router.put('/:id', authenticateUser, authorizeRole('admin'), upload.single('icon'), validateBody(pointSchema), pointController.updatePoint);

router.patch('/:id/status', authenticateUser, authorizeRole('admin'), pointController.toggleStatus);

router.delete('/:id', authenticateUser, authorizeRole('admin'), pointController.deletePoint);
module.exports = router;