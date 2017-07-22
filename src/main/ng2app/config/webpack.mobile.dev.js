var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.mobile.common');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval-cheap-module-source-map',

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
