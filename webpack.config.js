const path = require('path');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.[hash].js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.(css|less)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader'
            }]
        }, {
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: true
                }
            }]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[hash].[ext]',
                    outputPath: 'images' 
                }       
            }]
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'src/index.html', // 指定模板文件
            filename: 'index.html', // 输出的文件名
            hash: false, // 如果 【output】 选项中指定了hash，此处可配置成false
            minify: false,
            inject: true
        }),
        new CleanWebpackPlugin(['./dist/']) // 打包文件前清除dist目录
    ],
    // 只会在production环境下起作用
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    ecma: 5,
                    mangle: {
                        keep_classnames: true,
                        keep_fnames: true
                    },
                    output: {
                        comments: false, // 去除代码注释
                        beautify: false
                    }
                }
            })
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
}