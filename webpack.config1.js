const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackDevServer = require("webpack-dev-server")
var publicPath = 'http://localhost:9000/dist/'
// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true, //所有JavaScript资源插入到body元素的底部
        hash: true,
        chunks: ['common', name],
        title: title,
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
        'user-login': ['./src/page/user-login/index.js'],
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    // optimization: {
    //     runtimeChunk: {
    //         name: "common"
    //     },
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "js/base.js",
    //                 chunks: "all"
    //             }
    //         }
    //     }
    // },
    // devServer: {
    //     historyApiFallback: true,
    //     //不使用inline模式,inline模式一般用于单页面应用开发，会自动将socket注入到页面代码中
    //     inline: true,
    //     //host: '0.0.0.0',
    //     contentBase: './dist',
    //     compress: false,
    //     port:7090,
    //     publicPath: '/dist/',
    //     open:true,
    //     openPage:'dist/view/'
    //     //public: /https?:\/\/([^\/]+?)\//.exec(publicPath)[1],
    // },
    plugins: [
        //css单独打包
        new ExtractTextPlugin('[name].css'),
        //独立通用模块到js/base.js

        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // html模板的处理
        //构建前清理 /dist 文件夹
       // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录'))
    ],
    resolve: {
        //extensions: [' ','.scss'],
        alias: {
            image: __dirname + '/src/image',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            util: __dirname + '/src/util',
            view: __dirname + '/src/view'
        }
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
        // rules: [
        //     {
        //         test: /\.css$/,
        //         loader: [
        //             'style-loader', {
        //                 loader: 'css-loader',
        //                 options: {
        //                     //modules:true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
        //                 }
        //             },
        //             {
        //                 loader: 'postcss-loader',
        //                 options: {
        //                     plugins: function () {
        //                         return [
        //                             require('autoprefixer')
        //                         ]
        //                     }
        //                 }
        //             },
        //             {
        //                 loader: 'sass-loader',
        //                 options: {
        //                     includePaths: [
        //                         path.resolve('./node_modules/bootstrap-sass/assets/stylesheets')
        //                     ]
        //                 }
        //             }
        //         ]
        //     },
        //     {
        //         test: /\.scss/,
        //         use: ExtractTextPlugin.extract({
        //             use: ['css-loader', 'postcss-loader', 'sass-loader']
        //         })
        //     },
        //     {
        //         test: /\.(gif|png|jpg|woff|svg|eot|ttf)(\?.*)?$/,
        //         use: 'url-loader?limit=10000&name=resource/[name].[hash:7].[ext]',
        //         // query: {
        //         //     limit: 10000,
        //         //     name: resource('image/[name].[hash:7].[ext]')
        //         // }
        //
        //     },
        //     {
        //         test: /\.string$/,
        //         use: 'html-loader'
        //     }
        // ]
    }
}
if('dev'=== WEBPACK_ENV){
    config.entry.common.push("webpack-dev-server/client?http://localhost:9000/");
}
// var compiler = webpack(config);
// var server = new WebpackDevServer(compiler, {
//     /*我们写入配置的地方*/
//     hot: true,
//     stats: {
//         colors: true
//     }
// });
// server.listen(9000);
module.exports = config;
