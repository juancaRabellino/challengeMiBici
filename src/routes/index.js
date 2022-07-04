const express = require('express')
const router = express.Router()
const stationsController = require('../controllers/stationsController')
const usersController = require('../controllers/usersController')
const passport = require('passport')
require('../configs/passport')

const passportAuthenticate = passport.authenticate('jwt', { session: false })

//STATIONS
router.route('/stations')
  .get(passportAuthenticate, stationsController.findStationsNearby)
  .post(passportAuthenticate, stationsController.createStation)

//USERS
router.route('/users')
  .get(passportAuthenticate, usersController.allUsers)
  .post(usersController.createUser)

router.route('/users/signin')
  .post(usersController.signIn)

module.exports = router
