const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
    SRC: path.resolve(__dirname, 'src'),
    DIST: path.resolve(__dirname, 'dist'),
};

module.exports = {
    entry: ['babel-polyfill', path.join(paths.SRC, 'index.js')],
    output: {
        path: paths.DIST,
        filename: 'app.js',
    },
    plugins: [
        new ExtractTextPlugin('style.bundle.css'),
        new CopyWebpackPlugin([
            { from: 'index.html' },
            { from: 'favicon.ico' },
            { from: 'images', to: 'images' },
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader',
                }),
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'cheap-module-source-map',
};
