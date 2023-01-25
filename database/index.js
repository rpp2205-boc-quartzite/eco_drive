const mongoose = require('mongoose');

const user = 'green-earth-1';
const pass = 'GreenEarth123';
const cluster = 'cluster0.ydd0dgw'
const dbname = 'green-earth';

const connectStr = `mongodb+srv://${user}:${pass}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`

// Clear Warning
mongoose.set('strictQuery', true);

// Connect to the MongoDB cluster
mongoose.connect(connectStr, {},
  (err) => {
    if (err) { console.log('ERROR: ', err) }
    else { console.log('mongoose is connected') }
  }
);

module.exports = mongoose.connection;
