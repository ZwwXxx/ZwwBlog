import request from "@/utils/request";
// 定义全局模块
const module = '/front/auth'

export function login(form) {
    return request({
        url: `${module}/login`,
        method: 'post',
        data: form
    })
}




