const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const extractLess = new ExtractTextPlugin( {
    filename : '[name].[contenthash].css',
    disable : process.env.NODE_ENV !== 'production',
} );

const settings = {
    entry: {
        bundle : [
            "react-hot-loader/patch",
            "./src/app.js"
        ],
    },
    output: {
        filename: "[name].js",
        publicPath: "/",
        path: path.resolve("public"),
    },
    resolve: {
        extensions: [
            ".js",
            ".json",
            ".css",
            ".less",
        ],
    },
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["env", { modules: false }],
                        "react"
                    ],
                    plugins: [
                        "transform-node-env-inline"
                    ],
                    env: {
                        development: {
                            plugins: ["react-hot-loader/babel"]
                        }
                    },
                },
            },
            {
                test: /\.(css|less)$/,
                use: extractLess.extract( {
                    use : [
                        {
                            loader : 'css-loader',
                            options : {
                                sourceMap : true,
                            },
                        },
                        {
                            loader : 'less-loader',
                            options : {
                                sourceMap : true,
                            },
                        },
                    ],
                    fallback : 'style-loader',
                } ),
            },
        ],
    },
    devServer: {
        contentBase: path.resolve("public"),
        publicPath: "http://localhost:8080/", // full URL is necessary for Hot Module Replacement if additional path will be added.
        quiet: false,
        hot: true,
        historyApiFallback: true,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin( { debug: true } ),
        extractLess,
    ],
};

module.exports = settings;
