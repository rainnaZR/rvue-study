// https://vue-loader.vuejs.org/zh/migrating.html

'use strict';
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].[hash].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            src_path: path.resolve(__dirname, 'src'),
            components_path: path.resolve(__dirname, 'src/components'),
            packages_path: path.resolve(__dirname, 'packages'),
            vui: path.resolve(__dirname, 'packages/vui'),
            rVueRouter: path.resolve(__dirname, 'packages/rvue-router')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/webpack-dev-server/client')]
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.(sa|sc|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true
                    }
                },
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
            ignoreOrder: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new OptimizeCSSAssetsPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join('/', 'index.html') }
            ]
        },
        hot: true,
        compress: true,
        host: '0.0.0.0',
        port: 8080,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        publicPath: '/',
        proxy: {},
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: false
        }
    },
};
