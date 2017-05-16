/**
 * Created by rueta on 4/2/17.
 */
const path = require('path');
const fs   = require('fs');
const read = require('fs').readFileSync;

const webpack            = require('webpack');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const autoprefixer       = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const NgAnnotatePlugin   = require('ng-annotate-webpack-plugin');

const DefinePlugin  = webpack.DefinePlugin;
const ProvidePlugin = webpack.ProvidePlugin;

const { NODE_ENV } = process.env;

const {
          SRC_DIR_NAME,
          DIST_DIR_NAME,
          ROOT_DIR,
          SRC_DIR,
          DIST_DIR,
      } = require('./directories');

const WISTIA_CONFIG = JSON.parse(read('./config/wistia.config.json'));

//  ------------------------------------


const postcssConfig = {
    plugins: () => ([autoprefixer]),
    sourceMap: true,
};


module.exports = {
    entry: require('./entries'),

    resolveLoader: {
        modules: [path.resolve('node_modules')],
    },

    resolve: {
        extensions: ['.js', '.scss', '.less'],
        modules: [
            path.resolve('node_modules'),
            SRC_DIR,
        ],
        alias: {
            'src': path.resolve(SRC_DIR_NAME),
        },
    },


    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve('node_modules'),
                    path.resolve(DIST_DIR_NAME),
                ],
                use: ['babel-loader'],
            },

            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: postcssConfig },
                        { loader: 'less-loader', options: { sourceMap: true } },
                    ],
                }),
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: postcssConfig },
                        { loader: 'sass-loader', options: { sourceMap: true } },
                    ],
                }),
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: postcssConfig },
                    ],
                }),
            },
            {
                test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: './assets/fonts/[hash].[ext]',
                },
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    mimetype: 'application/octet-stream',
                    name: './assets/fonts/[hash].[ext]',
                },
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    mimetype: 'image/svg',
                    name: './assets/fonts/[hash].[ext]',
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                query: {
                    name: './assets/images/[hash].[ext]',
                },
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                query: {
                    name: './assets/fonts/[hash].[ext]',
                },
            },
            {
                test: /src[/\\].+\.template\.html$/,
                loader: 'raw-loader',
            },
        ],
    },

    plugins: [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),

        new HtmlWebpackPlugin({
            template: path.join(SRC_DIR_NAME, 'index.html'),
            inject: 'body',
        }),
        new CleanWebpackPlugin([DIST_DIR_NAME], {
            root: ROOT_DIR,
        }),
        new NgAnnotatePlugin(),
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV),
                'API_PASSWORD': JSON.stringify(WISTIA_CONFIG.API_PASSWORD),
                'UPLOAD_URL': JSON.stringify(WISTIA_CONFIG.UPLOAD_URL),
            },

        }),
    ],
};
