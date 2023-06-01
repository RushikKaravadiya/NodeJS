const { Router } = require('express');
const controller = require('../controller/fileUploadController');

const router = new Router();

router.post('/singleFileUpload',controller.singleFileUpload);
router.post('/multipleFileUpload',controller.multipleFileUpload);

module.exports = router;