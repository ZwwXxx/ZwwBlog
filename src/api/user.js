import request from "@/utils/request";
// 定义全局模块
const module = '/front/user'

// 获取用户信息
export function getUserInfo() {
    return request({
        url: `${module}/info`,
        method: 'get'
    })
}

// 更新用户信息
export function updateUserInfo(data) {
    return request({
        url: `${module}/update`,
        method: 'put',
        data
    })
}

// 修改密码
export function changePassword(data) {
    return request({
        url: `${module}/changePassword`,
        method: 'put',
        data
    })
}

// 上传头像
export function uploadAvatar(data) {
    return request({
        url: `${module}/avatar`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
