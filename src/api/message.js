import request from "@/utils/request";
// 定义全局模块
const module = '/message'
export function submitMessage(form) {
    return request({
        url:`${module}/add`,
        method:'post',
        data:form
    })
}
export function selectList(limit) {
    return request({
        url:`${module}/selectList/${limit}`,
        method:'get'
    })
}
