const path = require('path');

const ArcGISPlugin = require('@arcgis/webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js',
    ],
    output: {
        filename: 'build/[name].bundle.js',
        publicPath: '',
    },
    devServer: {
        publicPath: '/',
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000,
    },

    plugins: [
        new CleanWebpackPlugin(['dist', 'build']),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional 
            filename: './[name].css',
            chunkFilename: './[id].css',
        }),
        new ArcGISPlugin({
            // useDefaultAssetLoaders: false,
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            chunksSortMode: 'none',
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
        rules: [{
            test: /\.stache$/,
            use: [{loader: 'raw-loader'}],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            }],
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        }, {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader',
            ],
        }, {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader', {
                    loader: 'resolve-url-loader',
                    options: {includeRoot: true},
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        }, {
            test: /\.(jpe?g|png|gif|webp)$/,
            loader: 'url-loader',
            options: {
                // Inline files smaller than 10 kB (10240 bytes)
                limit: 10 * 1024,
            },
        }, {
            test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'build/[name].[ext]',
                },
            }],
        }],
    },


    resolve: {
        alias: {
            'esri': 'arcgis-js-api',
        },
    },


    node: {
        process: false,
        global: false,
        fs: 'empty',
    },


    externals: [
        (context, request, callback) => {
            if (/pe-wasm$/.test(request)) {
                return callback(null, 'amd ' + request);
            }
            callback();
        },
    ],
};
