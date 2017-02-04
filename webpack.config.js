
'use strict';

module.exports = {
    entry: './app.js',

    devtool: 'source-map',

    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [ 'babel-loader?experimental' ]
            }
        ]
    }
};
