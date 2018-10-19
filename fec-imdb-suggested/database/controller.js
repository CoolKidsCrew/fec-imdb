const movie = require('./model.js');

// let retrieveAll = callback => {
//   //find last 10 documents/rows from DB;
//   movie.Movie.find({Title:"Frozen"})
//     .then(data => {
//       callback(null, data);
//     })
//     .catch(error => {
//       callback(error, null);
//     });
// };


////////////////
//SDC Controls//
////////////////

//SDC mongoose controls only:
const randomize = movies => {
  for (let i = movies.length-1; i > 0; i--){
    const n = Math.floor(Math.random() * (i + 1));
    [movies[i], movies[n]] = [movies[n], movies[i]]
  }
  return movies;
}

// let retrieveAll = callback => {
//   //find last 10 documents/rows from DB;
//   movie.Movie.find({id: {$gt:9999990, $lt:10000001}})
//     // .limit(10)
//     .lean()
//     .exec()
//     .then(data => {
//       // callback(null, randomize(data));
//       callback(null, data);
//     })
//     .catch(error => {
//       callback(error, null);
//     });
// };

/////////////////////
////MongoDB Native//
///////////////////


const MongoClient = require('mongodb').MongoClient; //using mongoDB native driver
// const { MongoClient } = require('mongodb') //deconstructed
const uri = "mongodb://localhost:27017/fmdb" //specify connection url
// const client = await MongoClient.connect(uri, { useNewUrlParser: true});

// const retrieveAll = callback => {
//   MongoClient.connect(uri, (err, db)=> {
//     if (err) { 
//       return console.dir('ERROR'); 
//     } 
//     // console.log("Connected to MongoDB Native @ fmdb! GET in progress");

//     const movieDb = db.db("fmdb");
  
//     movieDb.collection("movies").find({"id": {"$gt":9999990, "$lt":10000001}}).toArray(function(err, data) {
//       if (err) console.log('error getting MongoData');
//       // console.log('at Controller: ', data);
      
//       // db.close();
//       callback(null, data);
//       // callback(null, randomize(data));
//     });
  
//     // //get ONE
//     // movieDb.collection("movies").findOne({"id":1}, function(err, result) {
//     //   if (err) throw err;
//     //   console.log('GET at controller', result);
//     //   db.close();
//     // });
    
//     db.close();
  
//   });
// }

//MONGO NATIVE//
//V3///////////

const {loadDB} = require('./index.js')


let retrieveAll = callback => {
  console.log('controller DB')
  // console.log(loadDB())
  loadDB().collection("movies").find({"id": {"$gt":9999990, "$lt":10000001}}).toArray( (err, data)=>{
    if (err) {
      console.log(err);
    } else {
      // console.log(data);
      callback(null, data)
    }
  })
}

  


module.exports = {retrieveAll};