import request from '@/utils/request'
// 定义全局模块
const module = '/tag'

// 获取角色分页列表
export function selectList(page, limit, searchObj) {
    return request({
        url: `${module}/selectList/${[page]}/${limit}`,
        method: 'get',
        // params: searchObj  //使用  @RequestParam("name") String name,接收或者是@PathVariable("前端键值") Integer后端形参名
        params: searchObj // 使用@RequestBody接收
    })
}

export function selectById(id) {
    return request({
        url: `${module}/${id}`,
        method: 'get'
    })
}
export function add(data) {
    return request({
        url: `${module}/add`,
        method: 'post',
        data
    })
}
export function deleteBatach(ids) {
    return request({
        url: `${module}/deleteBatch/${ids}`,
        method: 'delete'
    })
}
export function deleteById(id) {
    return request({
        url: `${module}/deleteById/${id}`,
        method: 'delete'
    })
}
export function update(data) {
    return request({
        url: `${module}/update`,
        method: 'put',
        data
    })
}

