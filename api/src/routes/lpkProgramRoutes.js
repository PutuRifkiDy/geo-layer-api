const { Router } = require('express');
const { authenticateUser } = require('../middleware/authenticationMiddleware');
const { authorizeRole } = require('../middleware/roleMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');
const { lpkProgramSchema } = require('../validator/lpkProgramValidator');
const lpkProgramController = require('../controller/lpkProgramController');

const router = Router();

router.get('/', authenticateUser, authorizeRole('admin'), lpkProgramController.getLPKPrograms);

router.post('/:pointObjectId', authenticateUser, authorizeRole('admin'), validateBody(lpkProgramSchema), lpkProgramController.createLPKPrograms);

router.put('/:id', authenticateUser, authorizeRole('admin'), validateBody(lpkProgramSchema), lpkProgramController.updateLPKProgram);

router.delete('/:id', authenticateUser, authorizeRole('admin'), lpkProgramController.deleteLPKProgram);

module.exports = router;