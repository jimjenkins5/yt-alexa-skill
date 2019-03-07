'use strict';

const path = require('path'),
      slsw = require('serverless-webpack'),
      entries = {};

Object.keys(slsw.lib.entries).forEach(
   (key) => (entries[key] = [ './source-map-install.js', slsw.lib.entries[key] ])
);

module.exports = {
   mode: 'development',
   entry: entries,
   devtool: 'inline-source-map',
   resolve: {
      extensions: [ '.js', '.jsx', '.json', '.ts', '.tsx' ],
   },
   output: {
      libraryTarget: 'commonjs',
      path: path.join(__dirname, '.webpack'),
      filename: '[name].js',
   },
   externals: [ 'sequelize', 'sequelize-typescript' ],
   target: 'node',
   module: {
      rules: [
         // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
         { test: /\.tsx?$/, loader: 'ts-loader' },
      ],
   },
};
