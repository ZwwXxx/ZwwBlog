import request from "@/utils/request";
// 定义全局模块
const module='/front/message'
export function submitMessage(form) {
    return request({
        url:`${module}/add`,
        method:'post',
        data:form
    })
}
export function selectList() {
    return request({
        url:`${module}/selectList`,
        method:'get'
    })
}
export function selectListByPage(queryParams) {
    return request({
        url:`${module}/list`,
        method:'get',
        params:queryParams
    })
}
