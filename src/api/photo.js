import request from "@/utils/request";
// 定义全局模块
const module='/front/photo'

export function selectList(queryParams) {
    return request({
        url:`${module}/list`,
        method:'get',
        params: queryParams
    })
}

