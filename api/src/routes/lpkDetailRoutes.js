const { Router } = require('express');
const { authenticateUser } = require('../middleware/authenticationMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');
const { lpkDetailSchema } = require('../validator/lpkDetailValidator');
const { authorizeRole } = require('../middleware/roleMiddleware');
const lpkDetailController = require('../controller/lpkDetailController');

const router = Router();

router.get('/:pointObjectId', authenticateUser, authorizeRole('admin'), lpkDetailController.getLPKDetails);

router.get('/detail/:id', authenticateUser, authorizeRole('admin'), lpkDetailController.getLpkDetailById);

router.post('/:pointObjectId', authenticateUser, authorizeRole('admin'), validateBody(lpkDetailSchema), lpkDetailController.createLPKDetail);

router.put('/:id', authenticateUser, authorizeRole('admin'), validateBody(lpkDetailSchema), lpkDetailController.updateLPKDetail);

router.delete('/:id', authenticateUser, authorizeRole('admin'), lpkDetailController.deleteLPKDetail);

module.exports = router;