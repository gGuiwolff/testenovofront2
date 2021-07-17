const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => ({
    entry: [
        "@babel/polyfill",
        path.join(__dirname, "src", "index.css"),
        path.join(__dirname, "src", "index.js"),
    ],
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
    },
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, "public"),
        //publicPath: '/',
        port: "3000",
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                loader: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        }),
    ],
});
