var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./styles/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./styles/'));
});

gulp.task('bootstrap', function() {
	var baseSRC = './node_modules/bootstrap/dist';

	gulp.src(baseSRC + '/css/*.css')
	.pipe(gulp.dest('./styles/'));

	gulp.src(baseSRC + '/js/*.js')
	.pipe(gulp.dest('./js/'));
});

gulp.task('default', ['bootstrap', 'less'], function(){
	gulp.watch('./styles/*.less', ['less']);
});