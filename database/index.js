require('dotenv').config();
const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.USERNAME;
const pass = process.env.PASSWORD;
const cluster = process.env.CLUSTER;
const dbname = process.env.DBNAME;

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
