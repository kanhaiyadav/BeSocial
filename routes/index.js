const passport = require('../config/passport.js');
const ecpress = require('express');
const router = ecpress.Router();
const home_controller = require('../controllers/home_controller');

router.get('/profile/:id', home_controller.profile);
router.get('/', passport.checkAuthenticated,home_controller.home);
router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use("/api", require("./api"));

module.exports = router;