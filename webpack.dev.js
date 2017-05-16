const path = require('path');
const fs   = require('fs');
const read = require('fs').readFileSync;

const webpack           = require('webpack');
const merge             = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const common       = require('./webpack.config');
const { DIST_DIR } = require('./directories');

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    output: {
        path: DIST_DIR,
        filename: '[name].js',
    },
    devServer: {
        watchOptions: {
            aggregateTimeout: 1000,
            ignored: /node_modules/,
        },
        inline: true,
        historyApiFallback: true,
        noInfo: false,
        clientLogLevel: 'error',
        compress: false,
        stats: 'minimal',
    },

    plugins: [
        new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
        new CommonsChunkPlugin({
            name: ['vendor', 'dependencies'],
            minChunks: Infinity,
        }),
    ],
});
