//引入axios库
import axios from "axios";
import { tansParams } from '@/utils/ruoyi'

// create an axios instance
const service = axios.create({
    // 设置请求基地址，到时候发送请求会在前面统一加上该字符串
    // baseURL: '/dev-api', // url = base url + request url
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    // 设置请求超时时间
    timeout: 50000 // request timeout
})
// 对请求进行拦截
service.interceptors.request.use(
    // 判断本地存储是否有token
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.setAuthorization(token)
        }
        // get请求映射params参数
        if (config.method === 'get' && config.params) {
            let url = config.url + '?' + tansParams(config.params)
            url = url.slice(0, -1)
            // 由于前面转object为url编码时后多了一个&，这里给他切掉，-1表示到数第一个的意思 0，-1切掉最后一个
            // let url = 'https://example.com/api?page=1&limit=10&';
            // url = url.slice(0, -1); // 结果是 'https://example.com/api?page=1&limit=10'
            config.params = {}
            config.url = url
            console.log(config.url)
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


service.interceptors.response.use(
    // 2xx范围内的状态码会触发该函数
    // 成功接收响应后的回调，形参为response响应体
    response => {
        // 获取响应体的data内容，返回给接口调用者
        const result = response.data
        return result;
    },
    // 超出状态码为2xx范围将会触发下面失败的回调
    error => {
        // 如果响应值为401则提示token过期，不是则直接返回
        if (error?.response?.status===401){
            // 清除本地存储的token
            localStorage.clear()
        }
        // 返回给接口调用者
        return Promise.reject(error);
    }
)

export default service
