
'use strict';

/* ==========================================================================


  Assemble / gulp build file

  Decription: This is used inplace of gulp but serves the same purpose. there are more options available like better middleware etc
			  but otherwise works exactly the same as a gulp file.
			  Go here for the docs and more info: https://github.com/assemble/assemble
			  Main driver tasks are all at the bottom of the file

========================================================================== */


var assemble = require('assemble');
var helpers = require('handlebars-helpers')();
var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;
var browserSync = require('browser-sync').create();
var watch = require('base-watch');
var csswring = require('csswring');

//Regular Gulp plugins
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var merge = require('merge-stream');
var lost  = require('lost');



//Custom includes
var utilities = require('./server/utilities');

//Other variables
var isProd = !!(argv.production); // true with --production flag
var ROOT_PATH = path.normalize(__dirname);
var SOURCE_PATH = 'source/';
var DIST_PATH = 'dist/';
//var PROD_ASSET_PATH = '../Suzuki.Site/Assets';

var mock = require('n-mock');

console.log('ROOT_PATH : ' + ROOT_PATH);


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// Assemble and templates
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
var app = assemble();

app.use(watch());

app.task('assemble', 'write-pages', function() {

app.create('pages');

app.create('includes', {viewType: 'partial'});

app.pages(SOURCE_PATH + 'html/pages/**/*.hbs');
app.partials(SOURCE_PATH + 'html/partials/**/*.hbs');
app.layouts(SOURCE_PATH + 'html/layouts/*.hbs');

app.data(SOURCE_PATH + 'html/data/**/*.{json,yml}');

app.option( {layout:  'default'} );

return app.toStream('pages')
.pipe(app.renderFile())
.pipe(rename(function (path) {
  path.extname = ".html";
}))
.pipe(app.dest(DIST_PATH));

});

/*  Write pages to the listing partial for index.html
 -----------------------------------*/
app.task('write-pages', function(done) {

  var content = utilities.getFileStrings();
  fs.writeFile(ROOT_PATH + '/source/html/partials/fileList.hbs', content, done);

});









////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// JAVASCRIPT
// Two bundles are currently created. main.js and vendor.js.
// Both are referenced in the site and main.js has a dependency on the contents of vendor.js
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var hbsfy = require('hbsfy');

app.task('scripts', ['vendor', 'polyfills'], function() {

	return app.src(SOURCE_PATH + 'js/build.js')
	  .pipe(browserify({
		insertGlobals : true,
		debug : !isProd
	  }).on('error', function error (err) {
		 //  setTimeout(function () {
			// browserSync.notify(err.message, 10000);
		 //  }, 1000);
		 //  this.emit('end');
		  console.log(err.toString());
          this.emit("end");
		})
	  )
	  .pipe(gulpif(!isProd, sourcemaps.init({loadMaps: true}))) // loads map from browserify file
	  .pipe(gulpif(!isProd, sourcemaps.write('./'))) // writes .map file
	  .pipe(gulpif(isProd, uglify()))
	  .pipe(gulp.dest(DIST_PATH + 'js'))
	  ;

});

app.task('vendor', function() {
  return app.src([
		SOURCE_PATH + 'js/vendor/jquery.2.2.4.min.js',
		SOURCE_PATH + 'js/vendor/plugins/*.js'
	])
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(app.dest(DIST_PATH + 'js'));
});

//Currently not included in the solution. Just here if needed for other things.
app.task('polyfills', function() {
  return app.src([
		SOURCE_PATH + 'js/polyfills/*.js'
	])
	.pipe(concat('polyfills.js'))
	.pipe(uglify())
	.pipe(app.dest(DIST_PATH + 'js'));
});






////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// SASS and CSS
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
var sassOptions = {
  errLogToConsole: true
};


// https://github.com/ai/browserslist#queries
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 1%', 'Firefox ESR', 'ie >= 9']
};

var preProcessors = [
    lost(),
];


app.task('sass', function () {

  console.log('isProd' + isProd);

  if (isProd) {
	sassOptions.outputStyle = 'compressed';
  }

  return app
	.src(SOURCE_PATH + 'css/main.scss')
	.pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(gulpif(!isProd, sourcemaps.write('./')))
    .pipe(postcss(preProcessors))
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(app.dest(DIST_PATH + 'css/'))
	.pipe(browserSync.stream());
});







////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//COPY TASKS
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
// COPY
// Copy individual assets from the client folder to /dist.
////////////////////////////////////////////////////////////////////////////////////////////////
app.task('copy', ['copy-root-assets'], function() {
  return gulp.src([
	  SOURCE_PATH + 'development/**/*',
	  SOURCE_PATH + 'js/custom-modernizr.js',
	  SOURCE_PATH + '/fonts/**/*',
	  SOURCE_PATH + 'images/**/*',
	  SOURCE_PATH + 'video/**/*'
	],{
	  base: SOURCE_PATH
	})
	.pipe(app.dest(DIST_PATH))
  ;
});

app.task('copy-root-assets', function() {
	return gulp.src([
	  ROOT_PATH + '/mocks/**/*'
	],{
	  base: ROOT_PATH
	})
	.pipe(app.dest(DIST_PATH));
});







////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//CLEAN TASK
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
app.task('clean', function(){
  return gulp.src([
	  DIST_PATH + '/*'
	], {read:false})
	.pipe(clean())
  ;
});

app.task('clean-prod', function(){
  return gulp.src([
	  PROD_ASSET_PATH + '/*'
	], {read:false})
	.pipe(clean({force: true}))
  ;
});










////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//  SVG ICONS
//  Generates an svg file and styl file with icon classes in /client/icons.
//  Renames the .svg file to .handlebars and copies to IconsModule folder so that the entire file can be inlined as a partial.
//
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
var svgSymbols = require('gulp-svg-symbols');

app.task('icons', function () {
  return app.src(SOURCE_PATH + 'svg-icons/*.svg')
	.pipe(svgSymbols({
	  templates: [
		SOURCE_PATH + 'css/_icons/_icons.scss',
		'default-svg'
	  ],
	  title: '%f icon',
	  fill: ''
	}))
	.pipe(rename('svg-defs.hbs'))
	.pipe(app.dest(SOURCE_PATH + 'html/partials/'));
});








////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// miscellaneous
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


//Modernizr build. Only used in production build. Used dev version of modernizr at/js/custom-modernizr
var modernizr = require('gulp-modernizr');
app.task('modernizr', function() {
  return app.src([
	  DIST_PATH + 'js/build.js',
	  DIST_PATH + 'css/main.css'
	])
	.pipe(modernizr({
	  "minify": true,
	}))
	.pipe(rename('custom-modernizr.js'))
	.pipe(gulp.dest(DIST_PATH + 'js'));
});


//minify pngs etc
app.task('imgmin', function() {
});




////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// PRODUCTION
// Most task run as is, but the isProd flag is turned on so we can minify,
// remove source maps etc.
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////



app.task('prod-tasks', ['modernizr', 'icons', 'sass', 'scripts', 'copy', 'assemble'], function() {

  // The final step is to copy the built assets to .Site folder
  // These will be copied from /dist to ../Suzuki.Site/assets with 'npm prodassets' setup in the package.json file.

	var streams = [];

	//All files fro production minus html etc.
	var all = gulp.src([
		DIST_PATH + '**/*.*',
		'!' + DIST_PATH + 'development/**/*',
		'!' + DIST_PATH + 'devHelpers/**/*',
		'!' + DIST_PATH + 'mockapi/**/*',
		'!' + DIST_PATH + '**/*.html',
	],{
	  base: DIST_PATH
	})
	.pipe(app.dest(PROD_ASSET_PATH));


	//Extra individual files
	//Svg source partial for backend to include.
	var staticSvgs = gulp.src([
			SOURCE_PATH + 'html/partials/svg-defs.hbs'
		], {
	  		base: SOURCE_PATH + 'html/partials/'
		})
		.pipe(rename(function (path) {
		  path.extname = ".cshtml";
		}))
		.pipe(app.dest(PROD_ASSET_PATH));

	streams.push(all);
	streams.push(staticSvgs);

	return merge(streams);

});



SOURCE_PATH + 'html/partials/'
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// FE build tasks
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
app.task('build', ['icons', 'sass', 'scripts', 'copy', 'assemble'], function(done) {
	done();
});


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// WATCH TASKS AND SERVER
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
app.task('server', ['build'], function() {
	browserSync.init({
		server: {
			baseDir: DIST_PATH,
			index: "index.html",
		    middleware: [
		      mock(__dirname + '/mockapi')
		    ]
		}
	});

	app.watch(SOURCE_PATH + "css/**/*.scss", ['sass']);
	app.watch(SOURCE_PATH + "html/**/*.hbs", ['assemble']);
	app.watch(SOURCE_PATH + "html/**/*.json", ['assemble']);
	app.watch(SOURCE_PATH + "images/**/*", ['copy']);
	app.watch(SOURCE_PATH + "js/**/*.js", ['scripts-watch']);
	app.watch(SOURCE_PATH + "mockapi/**/*", ['copy']);

	app.watch(DIST_PATH + "*.html").on('change', browserSync.reload);
});

app.task('scripts-watch', ['scripts'], function (done) {
	browserSync.reload();
	done();
});





//Default development task. Builds fe site, assemble and runs server and watch tasks
app.task('default', ['clean', 'server']);

//Production buiuld. Minifies and copies assets out into .Site forder for production
app.task('prod', ['clean-prod', 'prod-tasks']);






module.exports = app;
