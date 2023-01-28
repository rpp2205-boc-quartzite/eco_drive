const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_MAP_API_KEY;


const calculateDistance = (lat1, lng1, lat2, lng2) => {
  if (!lat1 || !lng1 || !lat2 || !lng2) {
    return;
  }
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${lat1},${lng1}&destinations=${lat2},${lng2}&key=${API_KEY}`;
  return axios.get(url)
    .then(res => {
      return res.data.rows[0].elements[0].distance
    })
    .catch(err => {
      console.log('Calculate distance error: ', err);
      return;
    })
}

module.exports.calculateDistance = calculateDistance;