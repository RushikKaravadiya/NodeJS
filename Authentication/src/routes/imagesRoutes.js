const { Router } = require('express');
const controller = require('../controller/imgUploadController');

const router = new Router();

router.post('/imageUpload',controller.singleFileUpload);
router.post('/multiImageUpload',controller.multiImageUploads);

module.exports = router;