const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/comment_controller');
router.get('/', comment_controller.home);
router.post('/create', comment_controller.create);
module.exports = router;