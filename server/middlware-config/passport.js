const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            let user = await User.findOne({ where: { username } });

            if (user) {
                user = user.toJSON();
                if (user.password === password) {
                    console.log("User Authenticated");
                    done(null, user);
                } else {
                    done(null, false);
                }
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error)
        }
    })
);

module.exports = passport;
