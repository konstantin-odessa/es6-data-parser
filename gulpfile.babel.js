import gulp from 'gulp';
import webpack from 'webpack-stream';
import path from 'path';

const paths = {
    es6Path: './src/**/*.*',
    es6: [ './src/**/*.js', '!./src/**/*.json' ],
    es5: './dist',
    // Must be absolute or relative to source map
    sourceRoot: path.join( __dirname, 'src' )
};

gulp.task('default', ['bundle']);
gulp.task( 'watch', [ 'bundle' ], () => {
    gulp.watch( paths.es6, [ 'bundle' ] );
} );

gulp.task('bundle', () => {
    return gulp.src('src/app.js')
        .pipe(webpack({
            devtool: 'source-map',
            output: {
                filename: 'bundle.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        include: [path.resolve(__dirname, 'src')],
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            stats: {
                colors: true
            },
        }))
        .pipe(gulp.dest('dist'));
});
