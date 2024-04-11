const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.home = (req, res) => {
    return res.render('post')
}

module.exports.create = async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.body.post_id }); 
        let comment = await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post_id
        });
        await post.comments.push(comment);
        await post.save();
        return res.redirect('back');
        }catch (err) {
            console.error(err);
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
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return;
    }
}