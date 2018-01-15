var 	gulp		=		require('gulp'),
		less		=		require('gulp-less');


gulp.task('less-compilation', function () {

	return gulp.src('assets//less/**/*.less')
				.pipe(  less()  )
				.pipe(  gulp.dest('assets/css')  );
});