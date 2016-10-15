var helpers = require('./helpers');
module.exports = {
    entry: {
        "bpmn-panel-property-camunda": "./src/bpmn-panel-property-camunda.js",
    },
    output: {
        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "Foo"
        library: "PropertiesProviderModule",        
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'        
    }
}