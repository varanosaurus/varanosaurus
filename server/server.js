var express = require('express');
var path = require('path');

var parser = require('body-parser');

var apiRouter = require('./routers/apiRouter');
var authRouter = require('./routers/authRouter');

var app = express();

app.use(parser.json());

app.use('/api', apiRouter);
app.use('/auth', authRouter);

var port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'test') {
  app.listen(port, function(error) {
    if (error) {
      console.error(error);
    }
  });
} else {
  db.init().then(function() {
    
    app.listen(port, function(error) {
      if (error) {
        console.error(error);
      } else {
        console.log('listening on port: ', port);
      }
    });

  });
}

module.exports = app;