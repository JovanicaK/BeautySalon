const {
    src,
    dest,
    parallel,
    series,
    watch,
} = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const sassLint = require('gulp-sass-lint');
const consolidate = require('gulp-consolidate');
const iconfont = require('gulp-iconfont');

// JS function 

function js() {
    const source = './src/js/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./assets/js/'))
        .pipe(browsersync.stream());
}

// CSS function 

function css() {
    const source = './src/scss/style.scss';

    return src(source)
        .pipe(changed(source))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(dest('./assets/css/'))
        .pipe(browsersync.stream());
}

// Copy HTML

function html() {
    return src('*.html')
    .pipe(dest('assets'))
    .pipe(browsersync.stream());
}

// Copy fonts 

function fonts() {
    return src('./src/fonts/**/*.{ttf,woff,eof,svg}')
    .pipe(dest('./assets/fonts'));
}

// Optimize images

function img() {
    return src('./src/images/*')
        .pipe(dest('./assets/images'))
        .pipe(browsersync.stream());
}

// Scss-Lint

function lint() {
    return src('./src/scss/**/*.s+(a|c)ss')
        .pipe(sassLint({
            configFile: 'sass-lint.yml'
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
}

// Iconfont
function icons() {
    return src('src/images/svg/*.svg')
    .pipe(iconfont({
        fontName: 'iconfont',
        formats: ['woff', 'woff2'],
        appendCodepoints: true,
        appendUnicode: false,
        normalize: true,
        fontHeight: 1000,
        centerHorizontally: true
    }))
    .on('glyphs', function (glyphs, options) {
        return src('src/scss/config/iconfont-template/_iconfont.scss')
            .pipe(consolidate('underscore', {
                glyphs: glyphs,
                fontName: options.fontName,
                fontDate: new Date().getTime()
            }))
            .pipe(dest('src/scss/config'));
    })
    .pipe(dest('assets/fonts'));
}

// Watch files

function watchFiles() {
    watch('./src/css/*', series(css));
    watch('./src/scss/**/*.s+(a|c)ss', series(lint));
    watch('./*html', series(html));
}

// BrowserSync

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
}

// Tasks to define the execution of the functions simultaneously or in series
exports.default = watchFiles;
exports.build = parallel( html,fonts, js, css, img);
exports.icons = icons;