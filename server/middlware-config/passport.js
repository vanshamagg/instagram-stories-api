const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const bcrypt=require('bcryptjs');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            let user = await User.findOne({ where: { username } });
            const checkpassword=await bcrypt.compare(password,user.password);
            if(!checkpassword){
               return res.status(400).json({msg:"Wrong password"})
            }
            if (user) {
                user = user.toJSON();
                if (checkpassword) {
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
