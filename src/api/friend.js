import request from "@/utils/request";
// 定义全局模块
const module = '/front/friend'

export function submit(form) {
    return request({
        url: `${module}/add`,
        method: 'post',
        data: form
    })
}

export function selectList(queryParams) {
    return request({
        url: `${module}/list`,
        method: 'get',
        params: queryParams
    })
}


