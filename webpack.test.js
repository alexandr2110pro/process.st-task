const webpack           = require('webpack');
const NgAnnotatePlugin  = require('ng-annotate-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.config');

const ProvidePlugin = webpack.ProvidePlugin;


const testConfig = module.exports = Object.assign(common, {
    devtool: 'inline-source-map',
    entry: () => ({}),
    output: {},
    devServer: {},
    plugins: [
        new NgAnnotatePlugin(),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
        new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    ],
});


testConfig.module.rules.push({
    test: /\.ts$/,
    enforce: 'post',
    exclude: [
        /node_modules/,
        /shared\/vendors-modules/,
        /karma\.entry\.js$/,
        /\.spec\.js$/,
        /\.mock\.js$/,
        /__tests__/,
    ],
    loader: 'istanbul-instrumenter-loader',
});
//
//     test: /\.js$/,
//     exclude: [
//         /node_modules/,
//         /shared\/vendors-modules/,
//         /karma\.entry\.js$/,
//         /\.spec\.js$/,
//         /\.mock\.js$/,
//         /__tests__/,
//     ],
//     loader: 'istanbul-instrumenter-loader',
//     enforce: 'pre',
// });
// //
