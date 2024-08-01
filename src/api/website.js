import request from "@/utils/request";

// 定义全局模块
const module = '/website'


// 获取网站信息
export function getWebsiteInfo() {
    return request({
        url: `${module}`,
        method: 'get',
    })
}




