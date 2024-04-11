const passport = require('passport')
const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/comment_controller');
router.get('/', comment_controller.home);
router.post('/create', comment_controller.create);
router.get('/destroy/:id', passport.checkAuthenticated, comment_controller.destroy);
module.exports = router;