const express = require('express');
const router = express.Router();
const passport = require('passport')
const post_controller = require('../controllers/post_controller');

router.get('/', passport.checkAuthenticated,post_controller.home);
router.post("/create", post_controller.create);
router.get(
  "/destroy/:id",
  passport.checkAuthenticated,
  post_controller.destroy
);

module.exports = router;