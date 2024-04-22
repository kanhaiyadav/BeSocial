const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require("../models/user");
const user_controller = require('../controllers/user_controller');
const multer = require('multer')

router.get('/signup', user_controller.signup);
router.get('/signin', user_controller.signin);
router.post('/create_user', User.uploadedAvatar, user_controller.create);
router.post('/authorize', passport.authenticate('local', {
    failureRedirect: '/user/signin'
}), user_controller.authorize);
router.get('/signout', user_controller.signout);
module.exports = router;