/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'angularrc5/node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'dist/assets/js', // 'dist',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',

            'lodash': 'npm:lodash',
            'bpmn-js': 'npm:bpmn-js',
            'bpmn-js-properties-panel': 'npm:bpmn-js-properties-panel'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            defaultJSExtensions: true,
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'lodash': { main: 'index.js', defaultExtension: 'js' },

            // 'bpmn-js': { main: 'index.js', defaultExtension: 'js' },
            // 'bpmn-js-properties-panel/lib': { main: './index.js', defaultExtension: 'js' },
            // 'bpmn-js-properties-panel/lib/cmd': { main: './index.js', defaultExtension: 'js' },

        }
    });
})(this);