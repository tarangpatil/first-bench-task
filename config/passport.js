const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../models/");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then((data) => {
        if (!data)
          done(new Error(`user not found with id ${jwt_payload.id}`), false);
        done(null, data);
      })
      .catch((err) => done(err, false));
  })
);

module.exports = passport;
