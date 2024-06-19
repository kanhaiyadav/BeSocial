const Comment = require("../models/comment");
const Post = require("../models/post");
const Like = require("../models/like");
const Dislike = require("../models/dislike");

module.exports.home = (req, res) => {
    return res.render('post')
}

module.exports.create = async (req, res) => {
    try {
        console.log(req.body);
        let post = await Post.findOne({ _id: req.body.post_id });
        let comment = await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post_id
        });
        await comment.populate('user');
        await post.comments.push(comment);
        await post.save();
        return res.status(200).json({
            data: {
                comment: comment,
            },
            message: "Comment created successfully"
        });
    } catch (err) {
        console.error('error in creating comment', err);
    }
}

module.exports.destroy = async (req, res) => {
    try {
        let comment = await Comment.findOne({ _id: req.params.id });
        let post = await Post.findById(comment.post);
        if (comment.user == req.user.id || req.user.id == post.user) {
            await Post.findByIdAndUpdate(
                comment.post,
                { $pull: { comments: req.params.id } },
            )
            await Comment.deleteOne({ _id: req.params.id });
            await Like.deleteMany({ on: req.params.id, onModel: "Comment" });
            await Dislike.deleteMany({ on: req.params.id, onModel: "Comment" });
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Comment deleted successfully"
            })
        }
    } catch (err) {
        console.log(err);
        return;
    }
}