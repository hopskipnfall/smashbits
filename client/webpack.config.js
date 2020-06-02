const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: './bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [{
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              modules: true,
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|ico|json)$/,
        loader: "file"
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SmashBits',
      template: 'index.html',
      favicon: 'static/favicon.ico',
    }),
    new Dotenv(),
  ]
};
