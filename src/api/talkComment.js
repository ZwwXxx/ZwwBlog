import request from "@/utils/request";
// 定义全局模块
const module='/front/talkComment'
export function submitComment(form) {
    return request({
        url:`${module}/add`,
        method:'post',
        data:form
    })
}
export function selectList(queryParams) {
    return request({
        url:`${module}/list/`,
        method:'get',
        params:queryParams

    })
}
export function commentLike(commentId) {
    return request({
        url:`${module}/commentLike/${commentId}/`,
        method:'get'
    })
}
