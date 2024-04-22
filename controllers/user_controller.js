const User = require("../models/user");
const Post = require("../models/post");
const fs = require("fs"); //   fs.unlinkSync(path.join(__dirname, "..",user.avatar));
const path = require('path');
module.exports.signup = function (req, res) {
    if (!req.isAuthenticated()) return res.render("signup");
    else res.redirect("back");
};
module.exports.signin = function (req, res) {
    if (!req.isAuthenticated()) return res.render("signin");
    else return res.redirect("back");
};

module.exports.create = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            try {
                // User.uploadedAvatar(req, res);
                if (req.file)
                {
                    console.log(req.file);
                    await User.create({
                        email: req.body.email,
                        password: req.body.password,
                        name: req.body.name,
                        avatar: User.avatarPath + '/' + req.file.filename,
                    })
                    console.log("sign up successful");
                    return res.redirect("/user/signin");
                }
                else
                    return res.redirect("back");
                    
            } catch (err) {
                console.log("error in creating user while signing up", err);
                return;
            }
        } else {
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err, "error in finding user in signing up");
        return;
    }
};

module.exports.authorize = (req, res) => {
    req.flash("success", "Logged in successfully");
    res.redirect("/");
};

module.exports.signout = (req, res) => {
    // res.redirect("/");
    req.logout((err) => {
        if (err) console.log(err);
    });
    req.flash("success", "Logged out successfully");
    res.redirect("/");
}