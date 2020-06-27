const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: './bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.sass'],
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
      test: /\.s[ac]ss$/,
      use: [
        { loader: 'style-loader' }, // to inject the result into the DOM as a style block
        { loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
        { loader: 'css-loader', options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
        { loader: 'sass-loader' }, // to convert SASS to CSS
      // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
      ],
    },
    {
      test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|ico|json)$/,
      loader: 'file',
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
  ],
};
