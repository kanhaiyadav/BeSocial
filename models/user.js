const mongoose = require("mongoose");
const multer = require('multer')
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');


const user_schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    },
  avatar: {
    type: String,
    },
  posts: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
      }
    ], 
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ]
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", AVATAR_PATH))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

//static methods: the methods and attributes defined in the user_schema.statics will be available to all
//the instances of the user model(all the users)
user_schema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');  //as our form has
//became a multipart form the req.body will not have been properly parsed when they are accessed on a reques in the controllers,
//hence we have to use the uploadedAvatar method which will parse is properly (you can also see it is taking
//an req object as one of the parameters)
user_schema.statics.avatarPath = AVATAR_PATH;

const UserModel = mongoose.model("User", user_schema);
module.exports = UserModel;
