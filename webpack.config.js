const webpack = require('webpack');
const path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + "/app/index.html",
  filename: 'index.html',
  inject: 'body'
});

var paths = {
  ENTRY: "./app/index.jsx",
  OUTPUT_FILENAME: "bundle.js",
  OUTPUT_PATH: __dirname + "/dist"
};

module.exports = {
  entry: [
    paths.ENTRY
    ],
  module: {
    loaders: [
      {test: /\.jsx/, include: __dirname + '/app', loader: "babel-loader",
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015']
      }}
    ]
  },
  output: {
    filename: paths.OUTPUT_FILENAME,
    path: paths.OUTPUT_PATH
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};