var 	gulp			=		require('gulp'),
		less			=		require('gulp-less'),
		browserSync		=		require('browser-sync').create();


gulp.task(  'less-compilation', function () {

	return gulp.src('./assets//less/**/*.less')
				.pipe(  less()  )
				.pipe(  gulp.dest('./assets/css')  )
				.pipe(  browserSync.stream()  );
});

gulp.task(  'watch', ['browser-sync', 'less-compilation'], function(){

	gulp.watch(  './assets/less/**/*.less', ['less-compilation']  );

	gulp.watch(  './assets/*.html',  browserSync.reload  );

	gulp.watch(  './assets/**/*.js',  browserSync.reload  );

	// browserSync.watch(  "./assets/*.html").on("change", browserSync.reload  );

});


gulp.task(  'browser-sync', function(){
	browserSync.init({
		server: 'assets'
	});
});
