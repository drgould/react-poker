const path = require('path');
const webpack = require('webpack');

const settings = {
    entry: {
        'bundle.js': [
            "react-hot-loader/patch",
            "./src/app.js"
        ],
        'style.css': "./src/app.css",
    },
    output: {
        filename: "[name]",
        publicPath: "/",
        path: path.resolve("public"),
    },
    resolve: {
        extensions: [".js", ".json", ".css"]
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
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "css-loader",
                ]
            },
        ]
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
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
    ],
};

module.exports = settings;
