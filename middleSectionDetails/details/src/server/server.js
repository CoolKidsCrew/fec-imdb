const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const db = require('../db/db');
const models = require('../db/models');

const app = express();
const logger = morgan('dev');
const PORT = process.env.PORT || 1337;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, '/../../dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../dist/index.html'));
});

app.get('/api/movie/:movieId', (req, res) => {
  // console.log(req.params);
  // res.send('send back movie page');
  
  models.getMovie(req.params.movieId)
  .then(result => res.send(JSON.stringify(result)))
  .catch(err => res.send(JSON.stringify(err)));
});

// post route for section edits
app.post('/api/movie/:movieId', (req, res) => {
  const { movieId } = req.params;
  const { section, text } = req.body;

  models.editMovie(movieId, section, text)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
});

app.get('/api/review/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  models.getReview({ id: reviewId }, (err, result) => {
    console.log(result);
    res.send(JSON.stringify(result));
  })
});

app.listen(PORT, () => {
  console.log('FMDB listening on ' + PORT);
});
