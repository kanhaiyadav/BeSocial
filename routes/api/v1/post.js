const express = require("express");
const router = express.Router();
const api_post = require("../../../controllers/api/v1/post");


router.get("/", api_post.post_index);

module.exports = router;