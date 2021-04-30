const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: false,

    entry: {
        main: './src/js/index.js',
    },

    output: {
        path:  path.join(process.cwd(), 'dist'),
    },

    module: {
        rules: [
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
                loader: 'image-webpack-loader',
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
    ],

};
