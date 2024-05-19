// 开发环境配置文件

// 用于合并一些通用配置
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { resolveApp } = require('../path');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const isNeedSpeed = true // 开关用于分析打包速度

let config = merge(common, {
    // 开发模式
    mode: 'development',
    // 开发工具，开启source map
    devtool: 'eval-cheap-module-source-map',
    // 输出
    output: {
        // bundle 文件名称
        // [name]-chunk name，没有名称用id来替代
        // [contenthash] 输出文件内容的md4-hash
        filename: '[name].bundle.js',
        // bundle 文件路径
        path: resolveApp('dist'),
        // 编译前清除目录
        clean: true
    },
    devServer: {
        // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要。
        // static: {
        //     directory: resolveApp('dist'),
        // },
        contentBase: resolveApp('dist'),
        hot: true,
        compress: true,
        port: 9000,
    },
});

module.exports = isNeedSpeed ? smp.wrap(config) : config;