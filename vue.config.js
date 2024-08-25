const {defineConfig} = require('@vue/cli-service')
const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = defineConfig({
    transpileDependencies: true,
    //配置src别名为@
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    devServer: {
        // port: port,
        open: true,
        proxy: {
            '/dev-api': {
                // target: 'http://118.31.228.113:5730/',
                target: 'http://localhost:7777/',
                ws: true,
                changeOrigin: true, // 允许跨域
                pathRewrite: {
                    '^/dev-api': ''
                    // 到时候由这个代理服务器发出去的路径前缀/dev-api全部替换为http://localhost:8080/而不是http://localhost:8080/dev-api
                }
            }
        }
    }
})
