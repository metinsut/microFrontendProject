const path = require('path');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const CommonConfig = require('./webpack.common.js');

const DevelopmentConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../build'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/marketingBundle.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

const devConfig = merge(CommonConfig, DevelopmentConfig);

module.exports = devConfig;
