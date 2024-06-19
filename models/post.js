const mongoose = require('mongoose');

const post_schema = new mongoose.Schema({
    content: {
        type: String,
        required: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    likesCount: {
        type: Number,
        default: 0
    },
    dislikesCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', post_schema);
module.exports = Post;