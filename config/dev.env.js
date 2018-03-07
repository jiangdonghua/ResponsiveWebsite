/**
 * Created by Administrator on 2018/3/7.
 */
const merge=require('webpack-merge')
const prodEnv=require('./prod.env')
module.export=merge(prodEnv,{
    NODE_ENV:'"development"'
})