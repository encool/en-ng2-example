var helpers = require('./helpers');
var webpack = require('webpack');
module.exports = {
    devtool: 'source-map',
    entry: {
        "bpmn-modeler-custom": "./src/bpmn-modeler.js",
    },
    output: {
        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "Foo"
        library: "BpmnJS",
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        preLoaders: [
            { test: /\.json$/, loader: 'json' },
        ],
        // loaders: [
        //     { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
        //     { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel' },
        //     { test: /\.css$/, exclude: /static/, loader: 'style!css' }
        // ]
    },
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