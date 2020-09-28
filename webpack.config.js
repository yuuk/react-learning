const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 获取入口文件
const getEntries = () => {
    let obj = {};
    glob.sync('./src/*/js/index.tsx').forEach((file) => {
        let filename = file.split('/')[2];
        obj[filename] = file;
    });
    return obj;
};

// 生成html模板
const generatorHtmlWebPackPlugin = () => {
    let html = [];
    glob.sync('src/*/index.html').forEach((entry) => {
        let filename = entry.split('/')[1];
        let instance = new HtmlWebPackPlugin({
            template: entry, // 指定模板文件
            filename: `${filename}/index.html`, // 输出的文件名
            hash: false, // 如果 【output】 选项中指定了hash，此处可配置成false
            inject: true,
            chunks: [filename],
        });
        html.push(instance);
    });
    return html;
};

const webpackPlugins = [
    // 提取css成文件
    new ExtractTextPlugin({
        filename: '[name]/css/index.[hash].css',
        allChunks: true,
    }),
    new CleanWebpackPlugin(['./dist/']), // 打包文件前清除dist目录
].concat(generatorHtmlWebPackPlugin());

const config = (options) => {
    let mode = options.mode;
    return {
        entry: getEntries(),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name]/js/index.[hash].js',
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    include: [path.resolve(__dirname, 'src')],
                    use: {
                        loader: 'ts-loader',
                    },
                },
                // {
                //   test: /\.(js|jsx)$/,
                //   include: [path.resolve(__dirname, "src")],
                //   use: {
                //     loader: "babel-loader",
                //   },
                // },
                {
                    test: /\.(css|less)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    minimize: true,
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    javascriptEnabled: true,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                name: '[path][name].[hash].[ext]',
                                publicPath(url) {
                                    return mode == 'production'
                                        ? url.replace(/src\/\w+\//, './')
                                        : url;
                                },
                                outputPath(url) {
                                    return mode == 'production' ? url.replace('src', '') : url;
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: webpackPlugins,
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: 'inline-source-map',
        // 只会在production环境下起作用
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        warnings: false,
                        ecma: 5,
                        mangle: {
                            keep_classnames: true,
                            keep_fnames: true,
                        },
                        output: {
                            comments: false, // 去除代码注释
                            beautify: false,
                        },
                    },
                }),
            ],
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            disableHostCheck: true,
            compress: true,
            port: 9000,
        },
    };
};

module.exports = (env, options) => {
    return config(options);
};
