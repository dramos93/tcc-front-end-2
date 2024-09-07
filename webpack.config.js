const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
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
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],    
};
