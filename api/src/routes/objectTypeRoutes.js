const Router = require('express');
const { authenticateUser } = require('../middleware/authenticationMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');
const { objectTypeSchema } = require('../validator/objectTypeValidator');
const { authorizeRole } = require('../middleware/roleMiddleware');
const objectTypeController = require('../controller/objectTypeController');

const upload = require('../middleware/multer');

const router = Router();

router.get('/', authenticateUser, authorizeRole('admin'), objectTypeController.getAllObjectTypes);

router.post('/', authenticateUser, authorizeRole('admin'), upload.single('icon_marker'), validateBody(objectTypeSchema), objectTypeController.createObjectType);

router.put('/:id', authenticateUser, authorizeRole('admin'), upload.single('icon_marker'), validateBody(objectTypeSchema), objectTypeController.updateObjectType);

router.get('/:id', authenticateUser, authorizeRole('admin'), objectTypeController.getObjectTypeById);

router.delete('/:id', authenticateUser, authorizeRole('admin'), objectTypeController.deleteObjectType);

module.exports = router;