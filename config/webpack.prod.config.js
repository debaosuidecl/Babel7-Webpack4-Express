const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Plugins
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const baseConfig = require('./webpack.base.config');

const prodConfiguration = env => {
    return merge([
        {
            optimization: {
                runtimeChunk: 'single',
                minimizer: [new UglifyJsPlugin()],
            },
            plugins: [
                new MiniCssExtractPlugin(),//The first will extract this into a separate module called main.css and the other will minify/uglify the generated CSS.
                new OptimizeCssAssetsPlugin(),
                new Visualizer({ filename: './statistics.html' })
            ],
        },
    ]);
};

module.exports = env => {
    return merge(baseConfig(env), prodConfiguration(env));
};