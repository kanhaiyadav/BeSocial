module.exports.post_index = async (req, res) => {
    return res.status(200).json({
        message: "List of posts",
        posts: []
    });
}