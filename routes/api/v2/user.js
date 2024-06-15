const express = require("express");
const router = express.Router();
const v2_user = require("../../../controllers/api/v2/user");

router.post("/authorize", v2_user.authorize);


module.exports = router;