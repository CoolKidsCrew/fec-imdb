const mongoose = require("mongoose");

let movieSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  Title: String,
  Year: String,
  Poster: String
});

let Movie = mongoose.model("movies", movieSchema, "movies");

module.exports.Movie = Movie;

//////////////////
//MONGO NATIVE///
////////////////
