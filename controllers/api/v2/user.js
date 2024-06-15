const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.authorize = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            return res.status(500).json({
                message: "Invalid user name or password"
            })
        }

        return res.status(200).json({
            message: "signed in successfully, here is your token keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), 'BeSocial', { expiresIn: '1h' })
            }
        })
    } catch (err) {
        console.log("******", err);
        return res.status(500).json({
            message: err
        })
    }
};