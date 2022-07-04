const express = require('express')
const router = express.Router()
const stationsController = require('../controllers/stationsController')
const usersController = require('../controllers/usersController')
const passport = require('passport')
require('../config/passport')

const passportAuthenticate = passport.authenticate('jwt', {session: false})

//STATIONS
router.route('/stations')
  .get(passportAuthenticate, stationsController.findAll)
  .post(passportAuthenticate, stationsController.createStation)

//USERS
router.route('/users/signup')
.post(usersController.signUp)

router.route('/users/signin')
.post(usersController.signIn)

router.route('/users')
.get(passportAuthenticate, usersController.allUsers)

module.exports = router
