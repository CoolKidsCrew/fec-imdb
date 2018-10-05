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

//SDC only:
const randomize = movies => {
  for (let i = movies.length-1; i > 0; i--){
    const n = Math.floor(Math.random() * (i + 1));
    [movies[i], movies[n]] = [movies[n], movies[i]]
  }
  return movies;
}

let retrieveAll = callback => {
  //find last 10 documents/rows from DB;
  movie.Movie.find({id: {$gt:9999989, $lt:10000000}})
    .then(data => {
      callback(null, randomize(data));
    })
    .catch(error => {
      callback(error, null);
    });
};

module.exports.retrieveAll = retrieveAll;