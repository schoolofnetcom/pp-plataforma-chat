const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const notify = require('gulp-notify')
const livereload = require('gulp-livereload')
const changed = require('gulp-changed')
const del = require('del')
const gutil = require('gulp-util')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const imagemin = require('gulp-imagemin')
const minifyCss = require('gulp-minify-css')
const minifyHtml = require('gulp-minify-html')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')

const paths = {
    fontsSrc: 'public/fonts/',
    htmlSrc:  'src/views/',
    sassSrc:  'public/scss/',
    jsSrc:    'public/js/',
    imgSrc:   'public/images/',

    buildDir: 'build/',
    revDir:   'build/rev/',
    distDir:  'dist/'
}

let onError = (err) => {
    gutil.beep()
    gutil.log(gutil.colors.red(err))
}

let initServer = () => {
    livereload.listen()
    nodemon({
        script: 'app.js',
        ext: 'js'
    })
    .on('restart', () => {
        gulp.src('app.js')
            .pipe(livereload())
            .pipe(notify('Reloading...'))
    })
}

gulp.task('build-html', () => {
    return gulp
            .src(paths.htmlSrc.concat('**/*.hbs'))
            .pipe(gulp.dest(paths.buildDir.concat('/views')))
            .pipe(livereload())
})

gulp.task('build-css', () => {
    return gulp
    .src(paths.sassSrc.concat('**/*.scss'))
            .pipe(sass({
                includePaths: require('node-neat').includePaths,
                style: 'nested',
                onError: function(){
                    console.log('SASS ERROR!')
                }
        }))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(gulp.dest(paths.buildDir.concat('/css')))
        .pipe(livereload())
})

gulp.task('build-js', () => {
    return gulp
            .src(paths.jsSrc.concat('*.js'))
            .pipe(plumber({ errorHandler: onError }))
            .pipe(changed(paths.buildDir.concat('/js')))
            .pipe(gulp.dest(paths.buildDir.concat('/js')))
            .pipe(livereload())
})

gulp.task('build-images', () => {
    return gulp
            .src(paths.imgSrc.concat('**/*.+(png|jpeg|gif|jpg|svg)'))
            .pipe(changed(paths.buildDir.concat('/images')))
            .pipe(gulp.dest(paths.buildDir.concat('/images')))
            .pipe(livereload())
})

gulp.task('build-fonts', () => {
    return gulp
            .src(paths.fontsSrc.concat('**/*.*'))
            .pipe(gulp.dest(paths.buildDir.concat('/fonts')))
            .pipe(livereload())
})

gulp.task('build', ['build-html', 'build-css', 'build-js', 'build-images', 'build-fonts'], (done) => {
    return initServer()
})

gulp.task('watch', () => {
    gulp.watch(['src/views/**/*.hbs'], ['build-html']);
    gulp.watch('public/scss/**', ['build-css']);
    gulp.watch(paths.jsSrc + '**/*.js', ['js']);
    gulp.watch(paths.imgSrc + '**/*.+(png|jpeg|jpg|svg)', ['build-images']);
})

const env = process.env.NODE_ENV || 'development'

if (env === 'development') {
    return gulp.task('default', ['build', 'watch'])
}