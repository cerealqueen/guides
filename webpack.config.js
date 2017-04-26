const path = require('path');
const webpack = require('webpack');

const prod = process.env.NODE_ENV === 'production';
console.log(`Compiling client code with production set to '${prod}'`);

const publicJsPath = path.resolve(__dirname, 'app', 'public', 'js');

module.exports = {
    target: 'web',
    entry: path.resolve(publicJsPath, 'index.tsx'),
    output: {
        path: publicJsPath,
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                { loader: 'babel-loader' },
                { loader: 'ts-loader' }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                { loader: 'babel-loader' }
            ]
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: ['file?context=src/images&name=images/[path][name].[ext]', 'image-webpack?optimizationLevel=2'],
            exclude: /node_modules/,
            include: __dirname,
        }, {
            test: /\.scss$/,
            use: prod ? (
                ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
            ) : (
                'style!css!postcss!sass'
            )
        }]
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    }
};