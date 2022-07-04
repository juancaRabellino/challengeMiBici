const Station = require('../models/Station')
const getDistanceInKm = require('../utils/getDistanceInKm')
const getFilterValues = require('../utils/getFilterValues')

const stationsController = {
  findStationsNearby: (req, res) => {
    const { query: { latitude, longitude, distance } } = req

    Station.find({
      status: "IN_SERVICE",
      $and: getFilterValues(latitude, longitude, distance)
    })
      .then(data => {
        const stationsNearby = data.filter(station => getDistanceInKm(station.latitude, station.longitude, latitude, longitude) < distance && station)
        return res.status(200).json({ success: true, response: { stationsNearby, total: stationsNearby.length } })
      })
      .catch(err => res.status(400).json({ success: false, err }))
  },

  createStation: (req, res) => {
    const { id, name, obcn, location, latitude, longitude, status } = req.body
    if (!id || !name || !latitude || !longitude)
      return res.status(400).json({ success: false, message: 'Los campos id, name, latitude y longitude son obligatorios.' })

    const stationToSave = new Station({ id, name, obcn, location, latitude, longitude, status })

    stationToSave.save()
      .then(stationSaved => res.status(201).json({ success: true, response: stationSaved }))
      .catch(err => res.status(400).json({ success: false, response: err }))
  }
}

module.exports = stationsController
