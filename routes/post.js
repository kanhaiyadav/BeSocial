const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/post_controller');

router.get('/', post_controller.home);
router.post("/create", post_controller.create);
module.exports = router;