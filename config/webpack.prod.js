// 生产环境配置文件

// 用于合并一些通用配置
const glob = require('glob')
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('../path.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  // 生产模式
  mode: 'production',
  // 输出
  output: {
      // bundle 文件名称
      filename: '[name].[contenthash].bundle.js',
      // bundle 文件路径
      path: path.resolveApp('dist'),
      // 编译前清除目录
      clean: true
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    // 提取 CSS
    new MiniCssExtractPlugin({
      filename: "[hash].[name].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.appSrc}/**/*`,  { nodir: true }),
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    minimizer: [
      // 用于压缩JavaScript文件
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
    // 将不常变化的代码（如第三方库）与频繁变化的应用代码分开，有助于更好地利用浏览器缓存。
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // 重复打包问题
      cacheGroups: {
        vendors: { // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          // name: 'vendors', // 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true
        }
      }
    },
    runtimeChunk: true,
  },
});