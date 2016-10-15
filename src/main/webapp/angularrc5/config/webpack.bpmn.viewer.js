var helpers = require('./helpers');
module.exports = {
    entry: {
        "bpmn-viewer-custom": "./src/bpmn-viewer.js",
    },
    output: {
        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "Foo"
        library: "BpmnViewer",
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        preLoaders: [
            { test: /\.json$/,  loader: 'json' },
        ],
        // loaders: [
        //     { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
        //     { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel' },
        //     { test: /\.css$/, exclude: /static/, loader: 'style!css' }
        // ]
    },
}