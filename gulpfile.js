var 	gulp			=		require('gulp'),
		less			=		require('gulp-less'),
		browserSync		=		require('browser-sync').create(),
		concat			=		require('gulp-concat'),
		gulpUglifyJS	=		require('gulp-uglify'),
		pump			=		require('pump'),
		cssnano			=		require('gulp-cssnano'),
		rename			=		require('gulp-rename'),
		del 			=		require('del'),
		imagemin		=		require('gulp-imagemin'),
		pngquant		=		require('imagemin-pngquant'),
		cache			=		require('gulp-cache'),
		autoprefixer	=		require('gulp-autoprefixer');


gulp.task(  'less-compilation', function () {

	return gulp.src('./assets//less/**/*.less')
				.pipe(  less()  )
				.pipe(  autoprefixer({
		            browsers: ['last 5 versions'],
		            cascade: false
		        }))
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

	return gulp.src(['app/css/ending-major.css',
					'app/css/main.css'])
				.pipe(autoprefixer({
		            browsers: ['last 2 versions'],
		            cascade: false
		        }))
				.pipe(  cssnano() )
				.pipe(  rename( {suffix: '.min'} ) )
				.pipe(  gulp.dest('app/css/') );

});


gulp.task( 'clean', function(){

	return del.sync('dist');

});


gulp.task(  'build', [ 'clean', 'minimages', 'less-compilation', 'scripts' ], function(){

	var buidCss		=	gulp.src([
			'app/css/ending-major.min.css',
			'app/css/main.css'
		])
	.pipe(  gulp.dest('dist/css'));

	var buildFonts  =  gulp.src('app/fonts/**/*')
	.pipe(  gulp.dest(  'dist/fonts'));

	var buidJs	=  gulp.src('app/js/**/*')
	.pipe(  gulp.dest('dist/js'));

	var buildHtml  = gulp.src('app/*.html')
	.pipe(  gulp.dest('dist/'));

});



gulp.task(	'minimages', function(){

	return gulp.src('app/img/**/*')
				.pipe( cache(imagemin({
						interlaced: true,
						progressive: true,
						optimizationLevel: 5,
						svgoPlugins: [{removeViewBox: true}],
						use: [pngquant()]
					})
	            ))
	            .pipe(  gulp.dest('dist/img/'));
});