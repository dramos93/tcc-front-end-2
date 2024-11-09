const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve( __dirname, 'dist' ),
    // publicPath: '/',
    assetModuleFilename: 'images/[hash][ext][query]',
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
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    // headers: {
    //   'Content-Security-Policy': "default-src 'self' https://jsonplaceholder.typicode.com; img-src *; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://jsonplaceholder.typicode.com",
    // },
    client: {
      logging: 'verbose',
    },
    open: true,
    hot: true,
    historyApiFallback: true,
    // proxy: [
    //   {
    //     context: ['/api'],
    //     target: 'http://127.0.0.1:5000',
    //     pathRewrite: { '^/api': '' },
    //     changeOrigin: true,
    //     secure: false,
    //     logLevel: 'debug',
    //   }
    // ]
  },
  plugins: [new HtmlWebpackPlugin( { template: './public/index.html' } )],
};
