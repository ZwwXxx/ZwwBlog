import request from "@/utils/request";
// 定义全局模块
const module = '/talkComment'
export function submitComment(form) {
    return request({
        url:`${module}/add`,
        method:'post',
        data:form
    })
}
export function selectList(talkId,limit) {
    return request({
        url:`${module}/selectList/${talkId}/${limit}`,
        method:'get'
    })
}
export function commentLike(commentId) {
    return request({
        url:`${module}/commentLike/${commentId}/`,
        method:'get'
    })
}
