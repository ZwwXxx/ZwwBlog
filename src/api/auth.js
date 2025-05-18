import request from "@/utils/request";
// 定义全局模块
const module = '/front/auth'

export function login(data) {
    return request({
        url: `${module}/login`,
        method: 'post',
        data
    })
}


export function register(data) {
  return request({
    url: `${module}/register`,
    method: 'post',
    data
  })
}




