const ecpress = require('express');
const router = ecpress.Router();
const home_controller = require('../controllers/home_controller');

router.get('/', home_controller.profile);
router.get('/home', home_controller.home);
router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use("/api", require("./api"));

module.exports = router;