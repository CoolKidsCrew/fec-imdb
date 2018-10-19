// const mongoose = require("mongoose");
// mongoose.connect(
//   // "mongodb://mongo:27017/test",
//   "mongodb://127.0.0.1:27017/fmdb", //renamed db from test
//   { useNewUrlParser: true }
// );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to fmdb database!");
// });

// module.exports.db = db;

/*==========================*/
//SDC CODE!! MongoDB Native//
/*========================*/

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient; //using mongoDB native driver
// const { MongoClient } = require('mongodb') //deconstructed
// const uri = "mongodb://localhost:27017" //specify connection url
const uri = "mongodb://54.193.40.128:27017" //EC2 instance for db


///////////////////////////////////////
////MongoDB Native Implementation V3//
/////CONNECTION POOLING VER 1.0//////
////////////////////////////////////

let fmdb;

MongoClient.connect(uri, {
    poolSize: 20
    }, (err, client) => {
  if (err) console.log('error with mongoconnect', err);
  fmdb = client.db("fmdb");
})


var loadDB = () => {
  return fmdb;
}

//return loadDB when its ready
module.exports.loadDB = loadDB;