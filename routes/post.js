const express = require('express');
const router = express.Router();
const passport = require('passport')
const post_controller = require('../controllers/post_controller');

router.get('/', passport.checkAuthenticated,post_controller.home);
router.post("/create", post_controller.create);
module.exports = router;