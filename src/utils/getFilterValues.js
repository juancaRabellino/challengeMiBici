const getFilterValues = (lat, lon, dist) => {
  lat = Number(lat)
  lon = Number(lon)
  dist = Number(dist)

  return [
    {
      latitude: { $lte: +(lat + dist / 100).toFixed(6), $gte: +(lat - dist / 100).toFixed(6) },
      longitude: { $lte: +(lon + dist / 100).toFixed(6), $gte: +(lon - dist / 100).toFixed(6) }
    }
  ]
}