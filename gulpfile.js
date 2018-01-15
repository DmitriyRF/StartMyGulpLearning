var 	gulp			=		require('gulp'),
		less			=		require('gulp-less'),
		browserSync		=		require('browser-sync').create(),
		concat			=		require('gulp-concat'),
		gulpUglifyJS	=		require('gulp-uglify'),
		pump			=		require('pump'),
		cssnano			=		require('gulp-cssnano'),
		rename			=		require('gulp-rename');


gulp.task(  'less-compilation', function () {

	return gulp.src('./assets//less/**/*.less')
				.pipe(  less()  )
				.pipe(  gulp.dest('./assets/css')  )
				.pipe(  browserSync.stream()  );
});

gulp.task(  'watch', ['browser-sync', 'less-compilation', 'scripts', 'css-processing'], function(){

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


gulp.task(  'scripts', function(cb){

	var minify_options =	{

	};

	pump([
	      	gulp.src([
				'app/assets/jquery/dist/jquery.js',
				'app/assets/magnific-popup/dist/jquery.magnific-popup.js'
			]),
			concat( 'assets.min.js'),
	      	gulpUglifyJS(),
	      	gulp.dest('app/js/')
    	],
    	cb
  	);
});


gulp.task(  'css-processing', ['less-compilation'], function(){

	return gulp.src('app/css/ending-major.css')
				.pipe(  cssnano() )
				.pipe(  rename( {suffix: '.min'} ) )
				.pipe(  gulp.dest('app/css/') );

});
