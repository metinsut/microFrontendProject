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
    port: 8081,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'marketingBundle.js',
      exposes: {
        './MarketingApp': './src/root',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

const devConfig = merge(CommonConfig, DevelopmentConfig);

module.exports = devConfig;
