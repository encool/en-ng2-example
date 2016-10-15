var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProj = ts.createProject('tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');

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
    tplhtml:[
        'app/**/*.html'
    ],
    tplcss:[
        'app/**/*.css'
    ],
    lib: { // 第三方依赖文件
        js: [
            'js/jquery.jqGrid.js',
            'js/jquery.jqGrid.min.js',
            'js/grid.locale-en.js',
            'node_modules/ztree/js/jquery.ztree.all.min.js',
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js',
            'systemjs.config.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/jquery/dist/jquery.min.js',
            // 'node_modules/jqgrid/js/i18n/grid.locale-cn.js',
            // 'node_modules/jqgrid/js/i18n/grid.locale-en.js',
            'node_modules/jqgrid/js/jquery.jqGrid.src.js',
            'node_modules/toastr/build/toastr.min.js',
            'js/bpmn-modeler-custom.js'
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/ztree/css/zTreeStyle/**/*',
            'node_modules/toastr/build/toastr.min.css',
        ],
        font:[
              'node_modules/font-awesome/fonts/*',
              'node_modules/bootstrap/fonts/*',
              ],
        img: [
            'bower_components/bootstrap/dist/images/*'
        ]
    }
};
var asoutput = "../dist/assets"; // output 
var htmloutput = "../dist";
gulp.task('default',['clean'],function(){
	gulp.run('deploy');
})
gulp.task('deploy',['htmlcp','csscp','tsc','imagescp'], function() {
	gulp.run('tsc:w','htmlcp:w','csscp:w');
	gulp.src(paths.lib.js).pipe(gulp.dest(asoutput + '/js'));
	gulp.src(paths.lib.css).pipe(gulp.dest(asoutput + '/css'));
	gulp.src(paths.lib.font).pipe(gulp.dest(asoutput + '/fonts'));
});
gulp.task('csscp',function(){
	gulp.src(paths.css).pipe(gulp.dest(asoutput + '/css'));
    gulp.src(paths.tplcss).pipe(gulp.dest(asoutput + '/js'));
})
gulp.task('htmlcp',function(){
	gulp.src(paths.html).pipe(gulp.dest(htmloutput));
    gulp.src(paths.tplhtml).pipe(gulp.dest(asoutput + '/js'));
})
gulp.task('imagescp',function(){
	gulp.src(paths.img).pipe(gulp.dest(asoutput + '/images'));
})

gulp.task('tsc', function() {
	var tsResult = gulp.src(paths.ts).pipe(sourcemaps.init()).pipe(ts(tsProj));
	return tsResult.js.pipe(sourcemaps.write(".")).pipe(
			gulp.dest(asoutput + '/js'));
});
gulp.task('csscp:w', ['csscp'], function () {
    gulp.watch(['css/*.css',paths.tplcss], ['csscp']);
});
gulp.task('tsc:w', ['tsc'], function () {
    gulp.watch('app/**/*.ts', ['tsc']);
});
gulp.task('htmlcp:w', ['tsc'], function () {
    gulp.watch([paths.html,paths.tplhtml], ['htmlcp']);
});
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('../dist', {read: false})
        .pipe(clean({force: true}));
});