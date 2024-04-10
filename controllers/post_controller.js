const Post = require("../models/post");

module.exports.home = async (req, res) => {
        try {
            posts = await Post.find({}).populate("user");
            return res.render("post", {
                posts: posts
            });
        } catch (err) {
            console.log("error in finding posts", err);
            return;
        }
};


module.exports.create = (req, res) => {
  try {
    let post = Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("/");
  } catch (err) {
    console.log("error in creating post....\n", err);
    res.redirect("back");
  }
};