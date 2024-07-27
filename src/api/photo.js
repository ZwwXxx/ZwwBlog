import request from "@/utils/request";
// 定义全局模块
const module = '/photo'

export function selectList(page,limit,searchObj) {
    return request({
        url:`${module}/selectList/${page}/${limit}`,
        method:'get',
        params:searchObj
    })
}

