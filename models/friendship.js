const mongoose = require('mongoose');

const friendship_schema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


const Friendship = mongoose.model('Friendship', friendship_schema);
module.exports = Friendship;