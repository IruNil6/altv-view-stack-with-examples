const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, argv) => {
  const config = {
    mode: argv.mode,
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].chunk.js',
      publicPath: './'
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
      rules: [
        { test: /\.(tsx|ts)?$/, loader: 'ts-loader' },
        {
          test: /\.less$/,
          exclude: /\.module\.less$/,
          use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader?url=false', 'less-loader'],
        },
        {          
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use:{
            loader: 'url-loader',
            options: {
              limit: false,
              name: 'media/[name].[ext]'
            }
          }
        }
      ],
    },
    plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: [path.resolve(__dirname, 'build')] }
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].chunk.css',
      }),
      new HtmlPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.ico')
      }),
    ],
    optimization: {
      minimize: argv.mode === 'production',
      nodeEnv: argv.mode
    }
  };

  return config;
}