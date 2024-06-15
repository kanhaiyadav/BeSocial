const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require("../models/user");

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'BeSocial'
}


passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        let user = await User.findById(jwt_payload._id);
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    } catch (err) {
        console.log(err);
    }

}));


module.exports = passport;