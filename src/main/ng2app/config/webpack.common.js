var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
// var AotPlugin = require('@ngtools/webpack')

module.exports = {
  entry: {
    'polyfills': './app/polyfills.ts',
    'vendor': './app/vendor.ts',
    'app': './app/main.ts'
  },

  externals: {
    jquery: 'window.$',
    toastr: 'toastr',
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [

      // {
      //   test: /\.ts$/,
      //   loader: '@ngtools/webpack',
      // },
    
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html',
        // options: {
        //   minimize: false,
        //   removeAttributeQuotes: false,
        //   caseSensitive: false, // <- this
        //   customAttrSurround: [
        //     [/#/, /(?:)/],
        //     [/\*/, /(?:)/],
        //     [/\[?\(?/, /(?:)/]
        //   ],
        //   customAttrAssign: [/\)?\]?=/]
        // }
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      // {
      //   test: /\.css$/,
      //   exclude: helpers.root('app'),
      //   loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      // },
      {
        test: /\.css$/,
        include: helpers.root('app'),
        loader: 'raw'
      },
      { test: /\.json$/, loader: "json-loader" }

    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
    }),
    // new AotPlugin({
    //   tsConfigPath: '../tsconfig.json',
    //   entryModule: '../app/app.module#AppModule'
    // })
  
    // new webpack.optimize.UglifyJsPlugin({
    //     beautify: false, //prod
    //     mangle: { screw_ie8 : true, keep_fnames: true }, //prod
    //     compress: { screw_ie8: true }, //prod
    //     comments: false //prod
    // })
    // new HtmlWebpackPlugin({
    //   template: 'html/index.html',
    //   filename: 'index.html'
    // })
  ]
};
