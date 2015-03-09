var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') ,
    notify = require('gulp-notify') ,
    bower = require('gulp-bower'),
  	compass = require('gulp-compass'),
  	minifyCSS = require('gulp-minify-css'),
  	browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    browserify = require('gulp-browserify'),
    jade = require('gulp-jade');

var reload = browserSync.reload;

var sources = {
     nodePath: './node_modules',
     bowerDir: './bower_components' ,
    jade: './jade/**/*.jade',
  	sass: './sass/**/*.scss',
    js: './js/**/*.js',
}

var dist = './dist';

var destinations = {
    dist: './dist',
    css: dist + '/css',
    js: dist + '/js',
    html: dist + '/',
}


gulp.task('templates', function () {
    return gulp.src(sources.jade)
      .pipe(jade({pretty: true}))
      .pipe(gulp.dest(destinations.html));
})

gulp.task('compass', function() {
  gulp.src(sources.sass)
    .pipe(compass({
      style: 'compressed',
      loadPath: [
        './resources/sass',
        sources.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
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
     gulp.watch(sources.sass, ['compass', reload]); 
    gulp.watch(sources.jade, ['templates', reload]);
    gulp.watch(sources.js, ['scripts', reload]);
});

  gulp.task('default', ['bower', 'browserSync','watch']);




