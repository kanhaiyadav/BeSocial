const mongoose = require('mongoose');

let dislike_schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    on: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    },
    onModel: {
        type: String,
        required: true,
        enum: ["Post", "Comment"]
    }
}, {
    timestamps: true
});


const Dislike = mongoose.model('Dislike', dislike_schema);
module.exports = Dislike;