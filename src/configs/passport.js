const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

module.exports = passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}, (payload, done) => {
  User.findById(payload._doc._id)
  .then(user => {
    if (!user) {
      done(null, false)
    } else {
      done(null,user)
    }
  })
  .catch(error => {
    return done(error, false)
  })
}))
