import request from "@/utils/request";
// 定义全局模块
const module = '/talk'

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
export function submitTalkComment(form) {
    return request({
        url:`${module}/add`,
        method:'post',
        data:form
    })
}
export function selectTalkCommentList(talkId,limit) {
    return request({
        url:`${module}/selectList/${talkId}/${limit}`,
        method:'get'
    })
}
