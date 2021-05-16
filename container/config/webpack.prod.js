const path = require('path');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const CommonConfig = require('./webpack.common');

const domain = process.env.PRODUCTION_DOMAIN;

const ProductionConfig = {
  mode: 'production',
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

const prodConfig = merge(CommonConfig, ProductionConfig);

module.exports = prodConfig;
