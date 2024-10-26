const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; img-src *; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    },
    client: {
      logging: 'verbose',
    },
    open: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};
