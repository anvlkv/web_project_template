var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    bower = require('gulp-bower');
	compass = require('gulp-compass');
	minifyCSS = require('gulp-minify-css');
	browserSync = require('browser-sync');

var config = {
     nodePath: './node_modules',
     bowerDir: './bower_components' ,
	sassPath: './sass',
}


gulp.task('compass', function() {
  gulp.src(config.sassPath + '/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'browserSync', 'compass']);