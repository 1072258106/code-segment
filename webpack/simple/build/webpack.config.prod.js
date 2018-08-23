'use strict'
const webpack = require('webpack')
const config = require('./config')
process.env.NODE_ENV = config.build.env;

const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    mode: config.build.env,
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    plugins: [
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: './src/index.html',
            minify: false,
        })
    ]
})