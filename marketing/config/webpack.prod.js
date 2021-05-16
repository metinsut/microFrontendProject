const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const CommonConfig = require('./webpack.common');

const ProductionConfig = {
  mode: 'production',
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

const prodConfig = merge(CommonConfig, ProductionConfig);

module.exports = prodConfig;
