const { Router } = require('express');
const { authenticateUser } = require('../middleware/authenticationMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');
const { authorizeRole } = require('../middleware/roleMiddleware');
const { lpkGallerySchema } = require('../validator/lpkGalleryValidator');
const lpkGalleryController = require('../controller/lpkGalleryController');

const upload = require('../middleware/multer');

const router = Router();

router.get('/', authenticateUser, authorizeRole('admin'), lpkGalleryController.getLPKGalleries);

router.post('/:pointObjectId', authenticateUser, authorizeRole('admin'), upload.single('image_url'), validateBody(lpkGallerySchema), lpkGalleryController.createLPKGallery);

router.put('/:id', authenticateUser, authorizeRole('admin'), validateBody(lpkGallerySchema), lpkGalleryController.updateLPKGallery);

router.delete('/:id', authenticateUser, authorizeRole('admin'), lpkGalleryController.deleteLPKGallery);

module.exports = router;