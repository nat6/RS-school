'use strict';

var gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass')(require('sass'));

gulp.task('pug', function () {
	return gulp.src('src/pug/pages/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
	return gulp.src('src/scss/pages/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist'))
});

gulp.task('watch', function () {
	gulp.watch('src/scss/*/*.scss', gulp.parallel('sass'));
	gulp.watch('src/pug/*/*.pug', gulp.parallel('pug'));
});
gulp.task('default', gulp.parallel('sass', 'pug', 'watch'));