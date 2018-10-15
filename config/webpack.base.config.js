const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const APP_DIR = path.resolve(__dirname, "../src");


module.exports = env => {
    const {PLATFORM, VERSION} = env;
    return merge([
        {
            entry:['@babel/polyfill', APP_DIR], // THIS IS JUST GIVING OUR WEBPACK 2 ENTRY POINT BABEL-POLYFILL AND SRC; BABEL-POLYFILL USES custom regenerator runtime and core-js.WHICH RUNS THE ASYNC AWAIT COMMANDS
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader'
                        }
                    },
                    {
                        test: /\.scss$/,
                        exclude: /node_modules/,
                        use: [
                            PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',// if it is production mode extract it to a different file to be optimized by OptimizeCssAssetsPlugin() or if in development directly inject the css into the DOM
                            'css-loader', // convert it to css with css loader then
                            'sass-loader' // enable sass loader then (GOES FROM DOWN TO UP)
                        ]
                    }
                ]
            },
            plugins:[
                new HTMLWebpackPlugin({
                    template: './src/index.html',
                    filename: './index.html'
                }),
                new webpack.DefinePlugin({
                    'process.env.VERSION': JSON.stringify(env.VERSION),
                    'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
                }),
                new CopyWebpackPlugin([ { from: 'src/static' } ]) //to load static images
            ]
        }
    ])

};