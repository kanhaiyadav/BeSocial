const ecpress = require('express');
const router = ecpress.Router();

router.use('/post', require('./post'));

module.exports = router;