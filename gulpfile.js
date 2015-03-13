var gulp = require('gulp'),
			browserSync = require('browser-sync'),
			compass = require('gulp-compass'),
			minifyCSS = require('gulp-minify-css'),
			bower = require('gulp-bower'),
			browserify = require('gulp-browserify'),
			concat = require('gulp-concat'),
			data = require('gulp-data'),
			fs = require('fs'),
			jade = require('gulp-jade'),
			notify = require('gulp-notify'),
			path = require('path'),
			rename = require('gulp-rename'),
			sass = require('gulp-ruby-sass'),
			uglify = require('gulp-uglify'),
			watch = require('gulp-watch');

var reload = browserSync.reload;

var sources = {
			nodePath: './node_modules',
			bowerDir: './bower_components' ,
			jade: './jade/templates/**/*.jade',
			sass: './sass/**/*.scss',
			js: './js/**/*.js',
			img: './img',
			fonts: './fonts',
			assets: './assets',
			data: './data/',
}

var dist = './dist';

var destinations = {
			dist: './dist',
			css: dist + '/css',
			js: dist + '/js',
			html: dist + '/',
			img: dist + '/img',
			assets: dist + '/assets',
			fonts: dist + '/fonts',
}

gulp.task('templates', function () {
		return gulp.src(sources.jade)
			.pipe(data(function (file) {
				return JSON.parse(
						fs.readFileSync(sources.data + path.basename(file.path) + '.json')
					)
			}))
			.pipe(jade({pretty: true}))
			.pipe(gulp.dest(destinations.html));
})

gulp.task('compass', function() {
	gulp.src(sources.sass)
		.pipe(compass({
			style: 'compressed',
			image: sources.img,
			sass: sources.sass,
			css: destinations.css,
			font: sources.fonts,
			javascript: sources.js,
			sourcemap: true,
			relative: true,
			loadPath: [
				'./resources/sass',
				sources.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
			],
			require: [
				'bootstrap-sass',
				'compass/import-once/activate',
			]
		}))
		.pipe(gulp.dest(destinations.css));
});

gulp.task('scripts', function () {
	return gulp.src(sources.js)
				.pipe(browserify())
				.pipe(uglify())
				.pipe(gulp.dest(destinations.js));
})

gulp.task('browserSync', function() {
		browserSync({
				server: {
						baseDir: destinations.dist
				}
		});
});

gulp.task('bower', function() { 
		return bower()
			.pipe(gulp.dest(sources.bowerDir)) ;
});

 gulp.task('watch', function() {
		 gulp.watch(sources.sass, ['compass', reload({stream: true})]); 
		gulp.watch(sources.jade, ['templates', reload]);
		gulp.watch(sources.js, ['scripts', reload]);
});

	gulp.task('default', ['bower', 'browserSync', 'watch']);




