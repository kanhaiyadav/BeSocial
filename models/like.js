const mongoose = require("mongoose");

const like_schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
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

const Like = mongoose.model("Like", like_schema);
module.exports = Like