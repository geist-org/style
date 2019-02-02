const HtmlPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const OptimizePlugin = require('optimize-css-assets-webpack-plugin')
const helper = require('./helper')
const merge = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
  devtool: 'eval',

  mode: 'production',

  output: {
    filename: '[name].css',
    path: helper.join('dist'),
  },

  plugins: [
    new ExtractPlugin('[name].css'),

    new HtmlPlugin({
      template: helper.join('src/templates/index.pug'),
    }),

    new OptimizePlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        safe: true,
        autoprefixer: true,
      },
    }),
  ],

})
