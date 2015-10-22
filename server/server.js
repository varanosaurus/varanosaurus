var express = require('express');
// var path = require('path');
var db = require('./db/interface');
var morgan = require('morgan');
var verifyToken = require('./services/middleware').verifyToken;

var parser = require('body-parser');

var apiRouter = require('./routers/apiRouter');
var authRouter = require('./routers/authRouter');

var app = express();

app.use(parser.json());

if (process.env.NODE_ENV !== 'testing') {
  app.use(morgan('dev'));
}

app.use('/api', verifyToken, apiRouter);
app.use('/auth', authRouter);

var port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'testing') {

  module.exports = app.listen(port, function(error) {
    if (error) {
      console.error('Error listening: ', error);
    } else {
      console.log('Testing: listening on port: ', port);
    }
  });

} else {
  db.init().then(function() {

    module.exports = app.listen(port, function(error) {
      if (error) {
        console.error(error);
      } else {
        console.log('listening on port: ', port);
      }
    });

  });
}

// module.exports = app;
