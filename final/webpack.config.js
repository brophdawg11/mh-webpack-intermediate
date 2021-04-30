const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: 'inline-source-map',

    entry: {
        main: './src/js/index.js',
    },

    output: {
        path:  path.join(process.cwd(), 'dist'),
    },

    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },

    module: {
        rules: [

            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { targets: "chrome 88" }]
                    ],
                },
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'url-loader',
                options: {
                    name: '[name]-[contenthash].[ext]',
                    limit: 1,
                },
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                resourceQuery: /optimize/,
                loader: 'image-webpack-loader',
            },

            {
                test: /\.svg$/,
                oneOf: [{
                    resourceQuery: /inline/,
                    loader: 'svg-inline-loader',
                }, {
                    resourceQuery: /http/,
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[contenthash].[ext]',
                    },
                }, {
                    test: /\.svg$/,
                    loader: 'svg-url-loader',
                    options: {
                        limit: 8192,
                        name: '[name]-[contenthash].[ext]',
                    },
                }],
            },

            {
                test: /\.s?css$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },

        ],
    },

    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'src/html/index.html' }],
        }),
        // new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ],

};
