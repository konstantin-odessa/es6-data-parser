var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: '#source-map',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
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
};
