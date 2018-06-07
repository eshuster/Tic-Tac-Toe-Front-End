var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var parentDir = path.join(__dirname, '../');

module.exports = {
    entry: [
        path.join(parentDir, 'src/index.js')
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },{
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    output: {
        publicPath: '/dist/',
        path: parentDir + '/dist',
        filename: 'bundle.js',
            // publicPath: '/public/'

    },
    plugins: [
        // Here we are taking the template found in 'src/index.html' and injecting our bundles
        // into the body secion of the file
        new HtmlWebpackPlugin({
          template: path.join(parentDir, '/src/index.html'),
          filename: 'index.html',
          inject: 'body'
        })
    ],
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    }
}