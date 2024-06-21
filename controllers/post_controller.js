const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user.js");
const Like = require("../models/like");
const Dislike = require("../models/dislike");

module.exports.home = async (req, res) => {
    try {
        let posts = await Post.find({}).populate("user").populate({
            path: "comments",
            populate: {
                path: "user",
            },
        });
        return res.render("home", {
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
        let user = await User.findById(req.user._id);
        user.posts.push(post);
        user.save();
        return res.status(200).json({
            data: {
                post: post,
                postUser: user
            },
            message: "Post created successfully",
        })
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
            await Like.deleteMany({ on: req.params.id, onModel: "Post" });
            await Dislike.deleteMany({ on: req.params.id, onModel: "Post" });
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted successfully",
            });
        }
        else {
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return;
    }
}