const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './public/js/app.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        use: [
          {
            loader: "babel-loader"
          }
        ],
      }
    ]
  },
  stats: {
    colors: true
  },
  //devtool: 'source-map'
};