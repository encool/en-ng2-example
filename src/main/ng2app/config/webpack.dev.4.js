var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.4.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-eval-source-map',

  output: {
    path: helpers.root('../webapp/dist'),
    publicPath: 'dist/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),

    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })
  ],


  // devServer: {
  //   historyApiFallback: true,
  //   stats: 'minimal'
  // }
});
