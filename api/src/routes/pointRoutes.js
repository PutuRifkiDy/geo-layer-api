const { Router } = require('express');
const { authenticateUser } = require('../middleware/authenticationMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');
const { pointSchema } = require('../validator/pointValidator');
const { authorizeRole } = require('../middleware/roleMiddleware');
const pointController = require('../controller/pointController');

const upload = require('../middleware/multer');

const router = Router();
// get points
router.get('/', authenticateUser, pointController.getPoints);

// add points
router.post('/', authenticateUser, authorizeRole('admin'), upload.single('icon'), validateBody(pointSchema), pointController.createPoint);

// update points
router.put('/:id', authenticateUser, authorizeRole('admin'), upload.single('icon'), validateBody(pointSchema), pointController.updatePoint);

// toggle status
router.patch('/:id/status', authenticateUser, authorizeRole('admin'), pointController.toggleStatus);

module.exports = router;