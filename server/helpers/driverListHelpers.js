const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_MAP_API_KEY;


const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const location1 = `${lat1},${lng1}`;
  const location2 = `${lat2},${lng2}`;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${location1}&destinations=${location2}&key=${API_KEY}`;
  return axios.get(url)
    .then(res => {
      const distanceText = res.data.rows[0].elements[0].distance.text;
      const distanceVal = res.data.rows[0].elements[0].distance.value;
      return {distanceText, distanceVal}
    })
    .catch(error => {
      console.log('Calculate distance error: ', error);
    })
}

module.exports.calculateDistance = calculateDistance;