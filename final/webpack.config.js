const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    devtool: false,

    entry: {
        main: './src/js/index.js',
    },

    output: {
        path:  path.join(process.cwd(), 'dist'),
        //filename: process.env.NODE_ENV === 'production' ? '[name]-[chunkhash].js' : '[name].js',
        chunkFilename: process.env.NODE_ENV === 'production' ? 'async/[name]-[chunkhash].js' : 'async/[name].js',
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
                        ['@babel/preset-env', { targets: "chrome 48" }]
                    ],
                    exclude: /node_modules\/?!(@urbn\/state-machine)/,
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
                    process.env.NODE_ENV === 'production' ?
                        MiniCssExtractPlugin.loader :
                        'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },

        ],
    },

    performance: {
        //hints: 'error', // 'warning'
        // maxEntrypointSize: 10,
        // maxAssetSize: 10,
        // Only enforce the asset file size against js files (exclude Sourcemaps
        // and SVG, etc.)
        //assetFilter: filename => filename.endsWith('.js'),
    },

    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'src/html/index.html' }],
        }),
        ...(process.env.NODE_ENV === 'production' ? [
            new MiniCssExtractPlugin()
        ] : []),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ],

};
