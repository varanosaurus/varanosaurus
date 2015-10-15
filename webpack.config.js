module.exports = {
  entry: './client/app.jsx',

  output: {
    path: __dirname + '/client/build/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }

};