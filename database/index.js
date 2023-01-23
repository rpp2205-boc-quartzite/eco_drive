// require('dotenv').config();
// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://cluster-0.zhkkdpj.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
//   sslCA: `${__dirname}/../green-earth.pem`,
//   authMechanism: 'MONGODB-X509',
// });

// const db = mongoose.connection;

// db.on('error', () => {
//   console.log('mongoose connection error');
// });

// db.once('open', () => {
//   console.log('mongoose connected successfully');
// });

// module.exports = db;

const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const credentials = `${__dirname}/../green-earth.pem`;
const client = new MongoClient('mongodb+srv://cluster-0.zhkkdpj.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});
async function run() {
  try {
    await client.connect();
    const database = client.db("testDB");
    const collection = database.collection("testCol");
    const docCount = await collection.countDocuments({});
    console.log(docCount);
    console.log('connnect success');
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
