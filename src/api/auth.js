import request from "@/utils/request";
// 定义全局模块
const module = '/front/auth'

export function login(form) {
    return request({
        url: `${module}`,
        method: 'post',
        data: form
    })
}




