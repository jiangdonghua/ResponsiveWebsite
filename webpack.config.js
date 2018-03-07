const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/'+name+'.html',
        filename: 'view/'+name+'.html',
        inject: true, //所有JavaScript资源插入到body元素的底部
        hash: true,
        chunks: ['common', name],
        title: title,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }
    }
}

const config = {
    entry: {
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/dist',
        filename: 'js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录'))
    ],
    resolve:{
        alias:{
            image:__dirname+'/src/image',
            page:__dirname+'/src/page',
            service:__dirname+'/src/service',
            util:__dirname+'/src/util',
            view:__dirname+'/src/view'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: {
                            //modules:true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve('./node_modules/bootstrap-sass/assets/stylesheets')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)(\?.*)?$/,
                loader: 'url-loader?limiy=10000&name=resource/[name].[hash:7].[ext]',
                // query: {
                //     limit: 10000,
                //     name: resource('image/[name].[hash:7].[ext]')
                // }

            },
            {
                test: /\.string$/,
                loader: 'html-loader'
            }
        ]
    }
}
module.exports = config;
