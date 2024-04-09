const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.js");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        let user = await User.findOne({ email: email });
        if (!user || password != user.password) {
          console.log("invalid username or password");
          return done(null, false);
        } else {
          console.log("user found", user);
          return done(null, user);
        }
      } catch (err) {
        console.log("error finding the user --> passport");
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    let user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log("error in finding the user");
    return done(err);
  }
});
passport.checkAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect("/user/signin");
};

passport.setAuthenticatedUser = function (req, res, next){
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
}
module.exports = passport;
