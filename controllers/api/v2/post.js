const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.post_index = async (req, res) => {
    const posts = await Post.find({});
    console.log(posts);
    return res.status(200).json({
        message: "success",
        posts: posts
    })
}

module.exports.delete = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log("1_",post.user);
        console.log("2_", req.user._id);
        console.log(post.user.equals(req.user._id))
        if (post.user.equals(req.user._id)) {
            await Post.findByIdAndDelete(req.params.id);
            await Comment.deleteMany({ post: req.params.id });

            return res.status(200).json({
                message: "success"
            })
        }
        else
        {
            return res.status(422).json({
                message:"You cannot delete this post"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err
        })
    }

}

