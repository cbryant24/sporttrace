const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [ './index.js' ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },
    context: resolve(__dirname, 'src'),
    module: {
        rules: [
            {
                test: /\.js|.jsx?$/,
                use: [ 'babel-loader' ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: '/imgs/'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
