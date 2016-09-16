var gulp = require('gulp'),
    watch = require('gulp-watch'),
    fileInclude = require('gulp-file-include'),
    imageMin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),

    // Styles
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),

    // Scripts
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');

var srcFolder = './src',
	distFolder = './dist/assets';

var assets = {
				source : {
					sass: [
							srcFolder + '/sass/theme.scss'
							],
					styles: [
								'./bower_components/bootstrap/dist/css/bootstrap.min.css',
								srcFolder + '/styles/lib/*.css', 
								srcFolder + '/styles/theme.css'
							],
					scripts: [
								'./bower_components/jquery/dist/jquery.js',
								'./bower_components/bootstrap/dist/js/bootstrap.js',
								srcFolder + '/scripts/lib/*.js', 
								srcFolder + '/scripts/common.js'
							],
					html: srcFolder + '/html/*.html',
					htmlInclude: srcFolder + '/html/includes/*.htm',
					fonts: [
								'./bower_components/bootstrap/fonts/*',
								srcFolder + '/fonts/*' 
							],
					images: [
								srcFolder + '/images/*',
								srcFolder + '/images/**/*'
							]
				},
				destination : {
					sass: srcFolder + '/styles/',
					scripts: distFolder + '/scripts/',
					styles: distFolder + '/styles/',
					html: './dist/',
					fonts: distFolder + '/fonts/',
					images: distFolder + '/images/'
				},
				file : {
					css: 'style.css',
					js: 'script.js'
				}
			},
	msg = {
			sass: 'Compiled sass',
			style: 'Compiled style',
			script: 'Compiled script',
			image: 'Compiled image',
			html: 'Compiled html',
			font: 'Compiled font'
			}


var footerAssets = {
				source : {
					sass: [
							srcFolder + '/sass/footer-theme.scss'
							],
					styles: [
								'./bower_components/bootstrap/dist/css/bootstrap.min.css',
								srcFolder + '/styles/bootstrap-footer.css',
								srcFolder + '/styles/footer-theme.css'
							],
					scripts: [
								'./bower_components/social-share-kit/dist/js/social-share-kit.js',
								srcFolder + '/scripts/footer.js'
							]
				},
				file : {
					css: 'footer-theme.css',
					js: 'footer.js'
				}
			}

gulp.task('default', ['wathch-sass', 'compile-sass', 'compile-style', 'compile-html', 'compile-script', 'compile-font', 'compile-image'] ,function(){
	watch(assets.source.sass, function(){
		gulp.start('compile-sass')
	});

	watch(assets.source.styles, function(){
		gulp.start('compile-style')
	});

	watch([assets.source.html, assets.source.htmlInclude], function(){
		gulp.start('compile-html')
	});

	watch(assets.source.scripts, function(){
		gulp.start('compile-script')
	});

	watch(assets.source.fonts, function(){
		gulp.start('compile-font')
	});

	watch(assets.source.images, function(){
		gulp.start('compile-image')
	});
});

gulp.task('compile-sass', function() {
	var  errorHandle = function(error) {
		this.emit('end');
	};

	gulp.src(assets.source.sass)
		.pipe(sass({outputStyle: 'expanded'})).on('error', errorHandle)
		.pipe(gulp.dest(assets.destination.sass));
});

gulp.task('wathch-sass', function(){
	gulp.watch(srcFolder + '/sass/modules/*.scss', ['compile-sass']);
});

gulp.task('compile-style', function() {
	gulp.src(assets.source.styles)
		.pipe(concat(assets.file.css))
		.pipe(cssnano({
			discardComments: { removeAll: true }
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(assets.destination.styles));
});

gulp.task('compile-html', function(){
	gulp.src(assets.source.html)
		.pipe(fileInclude())
		.pipe(gulp.dest(assets.destination.html));
});

gulp.task('compile-script', function(){
	gulp.src(assets.source.scripts)
		.pipe(concat(assets.file.js))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(assets.destination.scripts));
});

gulp.task('compile-font', function(){
	gulp.src(assets.source.fonts)
		.pipe(gulp.dest(assets.destination.fonts));
});

gulp.task('compile-image', function(){
	gulp.src(assets.source.images)
		.pipe(imageMin({progressive: true}))
		.pipe(gulp.dest(assets.destination.images));
});