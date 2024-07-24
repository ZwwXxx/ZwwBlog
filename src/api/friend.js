import request from "@/utils/request";
// 定义全局模块
const module = '/friend'
export function submit(form) {
    return request({
        url:`${module}/add`,
        method:'post',
        data:form
    })
}
export function selectList(page,limit) {
    return request({
        url:`${module}/selectList/${page}/${limit}`,
        method:'get'
    })
}
export function commentLike(commentId) {
    return request({
        url:`${module}/commentLike/${commentId}/`,
        method:'get'
    })
}
