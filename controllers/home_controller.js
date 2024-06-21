let User = require('../models/user');
let Post = require('../models/post');
let Like = require('../models/like');
const Dislike = require('../models/dislike');
module.exports.home = async function (req, res) {
    let posts = await Post.find({}).populate("user").populate({
        path: "comments",
        populate: {
            path: "user",
        },
    }).populate("likes");
    for (let post of posts) {
        if (await Like.findOne({ user: req.user._id, on: post._id })) {
            post.isLiked = true;
        }
        else {
            post.isLiked = false;
        }
        if (await Dislike.findOne({ user: req.user._id, on: post._id })) {
            post.isDisliked = true;
        }
        else {
            post.isDisliked = false;
        }
    }
    return res.render('home', {
        posts: posts
    });
}


module.exports.profile = async (req, res) => {
    let user = await User.findById(req.params.id);
    return res.render('profile', {
        req_user: user
    })
}