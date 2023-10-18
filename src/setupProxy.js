const proxy = require('http-proxy-middleware')//引入http-proxy-middleware，react脚手架已经安装

module.exports = function(app){
    app.use(
        proxy.createProxyMiddleware('/qy/api/v1/os',{
            target:'http://82.157.67.120:7777',
            changeOrigin:true,
        }),
    )
}
