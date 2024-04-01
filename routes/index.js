const ecpress = require('express');
const router = ecpress.Router();
const home_controller = require('../controllers/home_controller');

router.get('/', home_controller.home);

module.exports = router;