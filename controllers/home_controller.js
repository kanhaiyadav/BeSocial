let Post = require('../models/post');
module.exports.home = async function (req, res) {
    let posts = await Post.find({}).populate("user").populate({
        path: "comments",
        populate: {
            path: "user",
        },
    });
    return res.render('home', {posts: posts});
}

module.exports.profile = (req, res) => {
    return res.render('profile');
}