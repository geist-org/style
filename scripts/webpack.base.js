const ExtractPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const helper = require('./helper')

module.exports = {
  entry: {
    style: helper.join('src/styles/index.styl'),
    template_style: helper.join('src/templates/styles/index.styl'),
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.css', '.styl', '.png'],
  },

  module: {
    rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    },
    {
      test: /\.styl$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'stylus-loader',
        ],
      }),
    },
    {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'url-loader',
      options: {
        limit: 100000,
      },
    },
    {
      test: /\.pug$/,
      loader: 'pug-loader',
      options: {
        pretty: true,
      },
    }],
  },

  plugins: [
    new CopyPlugin([{
      from: helper.join('src/templates/assets'),
      to: 'assets',
    }])
  ],
}

