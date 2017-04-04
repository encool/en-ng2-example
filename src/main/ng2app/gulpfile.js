var gulp = require('gulp');
var gutil = require("gulp-util");
var ts = require('gulp-typescript');
var tsProj = ts.createProject('tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');

var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

var paths = {
    ts: [
        'app/**/*.ts',
        'typings/globals/**/*.d.ts'
    ],
    js: [ // js目录
        'app/*'
    ],
    css: [
        'css/**/*'
    ],
    img: [
        'images/*'
    ],
    html: [
        'html/*'
    ],
    tplhtml: [
        'app/**/*.html'
    ],
    tplcss: [
        'app/**/*.css'
    ],
    lib: { // 第三方依赖文件
        js: [
            'js/jquery.jqGrid.min.js',
            'js/grid.locale-cn.js',
            'node_modules/ztree/js/jquery.ztree.all.min.js',
            'node_modules/core-js/client/shim.min.js',
            // 'node_modules/zone.js/dist/zone.js',
            // 'node_modules/reflect-metadata/Reflect.js',
            // 'node_modules/systemjs/dist/system.src.js',
            // 'systemjs.config.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            // 'node_modules/jqgrid/js/i18n/grid.locale-cn.js',
            // 'node_modules/jqgrid/js/i18n/grid.locale-en.js',
            // 'node_modules/jqgrid/js/jquery.jqGrid.src.js',
            'node_modules/toastr/build/toastr.min.js',
            'js/bpmn-modeler-custom.js',
            'js/bootstrap-datepicker.zh-CN.min.js',
            'js/bootstrap-datepicker.min.js',
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/ztree/css/zTreeStyle/**/*',
            'node_modules/toastr/build/toastr.min.css',
        ],
        font: [
            'node_modules/font-awesome/fonts/*',
            'node_modules/bootstrap/fonts/*',
        ],
        img: [
            'bower_components/bootstrap/dist/images/*'
        ]
    }
};
var asoutput = "../webapp/dist/assets"; // output 
var htmloutput = "../webapp/dist";
gulp.task('default', ['clean'], function () {
    gulp.run('deploy');
})
gulp.task('deploy', ['htmlcp', 'csscp', 'imagescp'], function () {
    gulp.run('webpack:w', 'htmlcp:w', 'csscp:w');
    gulp.src(paths.lib.js).pipe(gulp.dest(asoutput + '/js'));
    gulp.src(paths.lib.css).pipe(gulp.dest(asoutput + '/css'));
    gulp.src(paths.lib.font).pipe(gulp.dest(asoutput + '/fonts'));
});
gulp.task('csscp', function () {
    gulp.src(paths.css).pipe(gulp.dest(asoutput + '/css'));
    gulp.src(paths.tplcss).pipe(gulp.dest(asoutput + '/js'));
})
gulp.task('htmlcp', function () {
    gulp.src(paths.html).pipe(gulp.dest(htmloutput));
    gulp.src(paths.tplhtml).pipe(gulp.dest(asoutput + '/js'));
})
gulp.task('imagescp', function () {
    gulp.src(paths.img).pipe(gulp.dest(asoutput + '/images'));
})

gulp.task('tsc', function () {
    var tsResult = gulp.src(paths.ts).pipe(sourcemaps.init()).pipe(ts(tsProj));
    return tsResult.js.pipe(sourcemaps.write(".")).pipe(
        gulp.dest(asoutput + '/js'));
});
gulp.task('csscp:w', ['csscp'], function () {
    gulp.watch(['css/*.css', paths.tplcss], ['csscp']);
});
gulp.task('tsc:w', ['tsc'], function () {
    gulp.watch('app/**/*.ts', ['tsc']);
});
gulp.task('htmlcp:w', ['htmlcp'], function () {
    gulp.watch([paths.html, paths.tplhtml], ['htmlcp']);
});
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('../webapp/dist', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task("webpack:build", function (callback) { 
    // modify some webpack config options
    // var myConfig = Object.create(webpackConfig);
    // myConfig.plugins = myConfig.plugins.concat(
    //     new webpack.DefinePlugin({
    //         "process.env": {
    //             // This has effect on the react lib size
    //             "NODE_ENV": JSON.stringify("production")
    //         }
    //     }),
    //     new webpack.optimize.DedupePlugin(),
    //     new webpack.optimize.UglifyJsPlugin()
    // );

    // run webpack
    webpack(webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('webpack:w',  function (callback) {debugger
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.watch = true
    // console.log("1111111111", myConfig.toString());    
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:w", err);
        gutil.log("[webpack:w]", stats.toString({
            colors: true
        }));
        
    });    
    callback();
});

gulp.task("bpmn:build", function (callback) { 
    // modify some webpack config options
    // var myConfig = Object.create(webpackConfig);
    // myConfig.plugins = myConfig.plugins.concat(
    //     new webpack.DefinePlugin({
    //         "process.env": {
    //             // This has effect on the react lib size
    //             "NODE_ENV": JSON.stringify("production")
    //         }
    //     }),
    //     new webpack.optimize.DedupePlugin(),
    //     new webpack.optimize.UglifyJsPlugin()
    // );
    var modeler = require("./config/webpack.bpmn.modeler.js");
    var panel = require("./config/webpack.bpmn.panel.js");
    var camundaproperty = require("./config/webpack.bpmn.panel.property.camunda.js");
    var viewer = require("./config/webpack.bpmn.viewer.js");
    // run webpack
    webpack(modeler, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        // gutil.log("[webpack:build]", stats.toString({
        //     colors: true
        // }));
        // callback();
    });
    webpack(panel, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        // gutil.log("[webpack:build]", stats.toString({
        //     colors: true
        // }));
        // callback();
    });
    webpack(camundaproperty, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        // gutil.log("[webpack:build]", stats.toString({
        //     colors: true
        // }));
        // callback();
    });
    webpack(viewer, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        // gutil.log("[webpack:build]", stats.toString({
        //     colors: true
        // }));
        callback();
    });
});