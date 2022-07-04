const express = require('express')
const router = express.Router()
const stationsController = require('../controllers/stationsController')

//STATIONS
router.route('/stations')
  .get(stationsController.findAll)
  .post(stationsController.createStation)

module.exports = router
