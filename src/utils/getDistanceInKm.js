const haversine = require('haversine')

const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  return haversine({ latitude: lat1, longitude: lon1 }, { latitude: lat2, longitude: lon2 })
}

module.exports = getDistanceInKm
