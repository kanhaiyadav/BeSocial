const express = require("express");
const router = express.Router();
const passport = require("passport");
const v2_post = require("../../../controllers/api/v2/post");
router.get("/", v2_post.post_index);
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), v2_post.delete);

module.exports = router;