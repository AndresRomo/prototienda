
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './deploy/dist'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyPlugin({
     patterns: [
       { from: 'src/css', to: 'css/' },
       { from: 'src/assets', to: 'assets/' }
     ]
   })
  ]
};
