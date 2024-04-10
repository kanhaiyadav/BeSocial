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