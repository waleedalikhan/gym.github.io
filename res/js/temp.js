import gulp from 'gulp'
import {src, dest, watch, parallel, series} from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'

import {create as Create} from 'browser-sync';
import * as pjson from './package.json'

const localUrl = "http://wp5.tst";
const browsersync = Create();
const reload = browsersync.reload;
var count = 0;

const myNewThemeName = 'mytheme';


const dirs = {
	src: '../themes/' + myNewThemeName,
	dest: '../wp-installed/wp5/wp-content/themes/' + myNewThemeName + '/'
}

// File Sources
const sources = {
	sass: `${dirs.src}/sass/**/*.scss`,
	scripts: `${dirs.src}/js/**/*.js`,
	html: `${dirs.src}/**/*.html`,
	php: `${dirs.src}/**/*.php`,
	css: `${dirs.src}/style.css`,
}

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

const buildStyles = (done) => gulp.src(sources.sass)
	.pipe(sourcemaps.init())
	.pipe(sass.sync(sassOptions).on('error', sass.logError))

	.pipe(sourcemaps.write())
	.pipe(autoprefixer(autoprefixerOptions))
	// .pipe(sourcemaps.write('.' ,{
	// 		addComment: false,
	// 		includeContent: false,
	// 		sourceRoot: './' + pjson.settings.name
	// }))
	.pipe(gulp.dest(dirs.dest))
	.pipe(browsersync.stream());



const devWatch = (done) => {
	console.log('Watching ... �')

	watch(sources.sass, buildStyles)
	watch(sources.css, browserSyncReload)
	watch(sources.php, browserSyncReload)
	// series(browserSyncReload)

	done()
}

const clean = (done) =>  {
	done();
}


// BrowserSync
const browserSync = (done) => {
	console.clear();
	console.log('Starting services ...�');
	 	browsersync.init({
			proxy: localUrl,
			logLevel: "silent"
		});
		console.log("Started : Now do the good stuff ... �");
  done();
}

// BrowserSync Reload
const browserSyncReload = (done) => {
	console.clear();
	console.log('Watching ... �')
	console.log('Reloading ...' + count++);


  browsersync.reload();
  done();
}




const dev = series(clean, browserSync, parallel(buildStyles), devWatch)
// const dev = series(browserSync);

// gulp.task('default', dev);

export default dev;
