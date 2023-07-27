const passport = require("passport");
const mongoose = require("mongoose");
const { Strategy, ExtractJwt } = require("passport-jwt");
const dotenv = require("dotenv");
dotenv.config();

require("../models/User");
const User = mongoose.model("User");

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    return done(null, await User.findById(id));
  } catch (error) {
    return done(error);
  }
});

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log(error);
      return done(error, false);
    }
  })
);
