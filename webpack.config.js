const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const ASSETS_SOURCE_PATH = path.resolve('./src');
const ASSETS_BUILD_PATH = path.resolve('./assets');
const ASSETS_PUBLIC_PATH = '/assets';

module.exports = {
  context: ASSETS_SOURCE_PATH,
  entry: {
    nn: ['./main.js'],
  },
  output: {
    path: ASSETS_BUILD_PATH,
    // path: path.join(__dirname),
    publicPath: ASSETS_PUBLIC_PATH,
    filename: './[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname),
    port: 80
},
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules|screen-capture/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/png',
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  // plugins: [new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: true })],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  }
};
