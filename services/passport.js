const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this username and pass, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // if it does, call 'done' with that otherwise,
  // call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    };
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
