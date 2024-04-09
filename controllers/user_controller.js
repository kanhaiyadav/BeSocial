const User = require("../models/user");
const Post = require("../models/post");
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
    console.log(user);
    if (!user) {
      try {
        User.create(req.body);
        console.log("sign up successful");
        return res.redirect("/");
      } catch (err) {
        console.log("error in creating user while signing up");
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
  res.redirect("/");
};