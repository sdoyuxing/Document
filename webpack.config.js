const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',//配置模式
  output: {
    path: path.resolve(__dirname, './dist'),//输出路径
    publicPath: '/',//路径前缀
    filename: 'build.js',//文件名称
  },
  module: {//解析css，对代码语言的出来编译
    rules: [
      {
        test: /\.less$/,
        use: [
          { loader: 'vue-style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          { loader: 'less-loader', options: { sourceMap: true, javascriptEnabled: true } },
        ],
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {//测试环境的配置
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  performance: {
    hints: false,
  },
  devtool: '#source-map',
  plugins: [//打包过程用到的插件
    new HtmlWebpackPlugin({
      template: 'site/index.html',//设置生成html模板
      filename: 'index.html',//输出的文件名称
      inject: true,//当传递true或body时，所有javascript资源都将放在body元素的底部。头将把脚本放在头元素中
    }),
  ],
});
