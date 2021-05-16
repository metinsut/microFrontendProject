const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CommonConfig = {
  context: path.join(__dirname, '../'),
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'assets/js/[name].js',
    path: path.join(__dirname, '../', 'build'),
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'build')],
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Marketing',
      template: 'public/index.html',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ],
  },
};

module.exports = CommonConfig;
