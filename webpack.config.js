const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app/index.ts',
    output: { path: `${__dirname}/dist`, filename: 'bundle.js' },
    devtool: 'source-map',
    debug: true,
    resolve: { extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'] },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};