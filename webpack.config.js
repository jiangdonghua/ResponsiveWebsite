const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true, //所有JavaScript资源插入到body元素的底部
        hash: true,
        chunks: ['common', name],
        title: title,
        favicon: './favicon.ico'
        // minify: {
        //     removeComments: true,
        //     collapseWhitespace: true,
        //     removeAttributeQuotes: true
        // }
    }
}

var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'jobs': ['./src/page/jobs/index.js'],
        'jobs-detail': ['./src/page/jobs-detail/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    devServer: {
        historyApiFallback: true,
        //不使用inline模式,inline模式一般用于单页面应用开发，会自动将socket注入到页面代码中
        inline: true,
        //host: '0.0.0.0',
        contentBase: __dirname + '/dist',
        watchContentBase: true,
        compress: true,
        port: 7090,
        openPage: 'dist/view',
        open: true
        //public: /https?:\/\/([^\/]+?)\//.exec(publicPath)[1],
    },
    plugins: [
        new webpack.ProvidePlugin({
           '$':"jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        }),
        //css单独打包
        new ExtractTextPlugin('css/[name].css'),
        //独立通用模块到js/base.js

        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // html模板的处理
        //构建前清理 /dist 文件夹
        //new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('jobs', '招聘')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('jobs-detail', '招聘详情'))

    ],
    resolve: {
        extensions: ['.js', '.scss', '.html'],
        alias: {
            images: __dirname + '/src/images',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            util: __dirname + '/src/util',
            view: __dirname + '/src/view'
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader", "postcss-loader"]
            // },
            // { test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback:"style-loader",
            //         use: ['css-loader','sass-loader','postcss-loader'],
            //         publicPath: "/dist"
            //     })},
            // {
            //     test: /\.sass$/,
            //     use: ExtractTextPlugin.extract(
            //         'style-loader',
            //         'css-loader',
            //         "postcss-loader",
            //         'sass-loader?indentedSyntax'
            //     )
            // },
            {
                test: /\.(scss|sass|css)$/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader?importLoaders=2!postcss-loader!sass-loader"})
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)(\?.*)?$/,
                use: 'url-loader?limit=10000&name=resource/[name].[hash:7].[ext]',
                // query: {
                //     limit: 10000,
                //     name: resource('fonts/[name].[hash:7].[ext]')
                // }

            },
            {
                test: /.woff|.woff2|.svg|.eot|.ttf/,
                use: 'url-loader?limit=10000&name=font/[name].[hash:7].[ext]'
            },
            {
                test: /\.string$/,
                use: 'html-loader'
            }
        ]
    }
}

module.exports = config;
