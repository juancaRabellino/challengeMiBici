const mongoose = require('mongoose')

const stationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  obcn: { type: String },
  location: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: { type: String, enum: ['IN_SERVICE', 'NOT_IN_SERVICE'], required: true }
}, { timestamps: true })

const Station = mongoose.model('station', stationSchema)

module.exports = Station
