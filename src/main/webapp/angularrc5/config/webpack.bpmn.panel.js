var helpers = require('./helpers');
module.exports = {
    entry: {
        "bpmn-panel": "./src/bpmn-panel.js",
    },
    output: {
        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "Foo"
        library: "PropertiesPanelModule",        
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'        
    }
}