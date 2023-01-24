require('dotenv').config();
const mongoose = require('mongoose');

const cluster = 'mongodb+srv://cluster-0.zhkkdpj.mongodb.net/green-earth?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';

try {
  // Connect to the MongoDB cluster
  mongoose.set('strictQuery', true);
  mongoose.connect(
    cluster,
    {
      useNewUrlParser:    true,
      useUnifiedTopology: true
    },
    () => console.log('mongoose is connected')
  );

  var db = mongoose.connection;

} catch (e) {
  console.log('mongoose could not connect to cluster');
}

module.exports = db;
