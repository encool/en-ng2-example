var helpers = require('./helpers');
var webpack = require('webpack');
module.exports = {
    entry: {
        "bpmn-panel": "./src/bpmn-panel.js",
    },
    output: {
        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "Foo"
        library: "PropertiesPanelModule",
        path: helpers.root('../webapp/lib/js'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    }
    ,
    plugins: [
        // new webpack.NoErrorsPlugin(),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            },
            compress: {
                warnings: false
            }
        }),
    ]
}