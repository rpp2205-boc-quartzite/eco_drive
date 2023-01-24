require('dotenv').config();
const mongoose = require('mongoose');

try {
  // Connect to the MongoDB cluster
  mongoose.set('strictQuery', true);
  mongoose.connect(
    process.env.DATABASE_CONNECTION_ADDRESS,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => console.log('mongoose is connected')
  );
  
  var db = mongoose.connection;

} catch (e) {
  console.log('mongoose could not connect to cluster');
}

module.exports = db;
//run().catch(console.dir);