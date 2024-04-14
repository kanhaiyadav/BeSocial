const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.home = async (req, res) => {
    try {
        let posts = await Post.find({}).populate("user").populate({
            path: "comments",
            populate: {
                path: "user",
            },
        });
        return res.render("post", {
            posts: posts
        });
    } catch (err) {
        console.log("error in finding posts", err);
        return;
    }
};


module.exports.create = async (req, res) => {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created successfully",
            })
        }
        return res.redirect("/");
    } catch (err) {
        console.log("error in creating post....\n", err);
        res.redirect("back");
    }
};

module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id });
        if (post.user == req.user.id) {
            await Post.deleteOne({ _id: post._id });
            await Comment.deleteMany({ post: req.params.id });
            console.log(req.xhr);
            if (req.xhr) {
                console.log(post);
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted successfully",
                });
            }
            else {
                console.log("hello murkh");
                return res.redirect("back");
            }
        }
    } catch (err) {
        console.log(err);
        return;
    }
}