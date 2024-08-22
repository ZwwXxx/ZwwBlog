import request from "@/utils/request";

// 定义全局模块
const module = '/article'

// 获取角色分页列表
export function selectList(page, limit,  queryParams) {
    return request({
        url: `${module}/selectList/${[page]}/${limit}`,
        method: 'get',
        // params:  queryParams  //使用  @RequestParam("name") String name,接收或者是@PathVariable("前端键值") Integer后端形参名
        params:  queryParams // 使用@RequestBody接收
    })
}
export function selectListByTag(page, limit,  queryParams) {
    return request({
        url: `${module}/selectListByTag/${[page]}/${limit}`,
        method: 'get',
        // params:  queryParams  //使用  @RequestParam("name") String name,接收或者是@PathVariable("前端键值") Integer后端形参名
        params:  queryParams // 使用@RequestBody接收
    })
}


export function selectById(id) {
    return request({
        url: `${module}/${id}`,
        method: 'get',
    })
}

export function getArchive() {
    return request({
        url: `${module}/getArchive`,
        method: 'get',
    })
}


// 获取最新的文章

export function getNewArticleList() {
    return request({
        url: `${module}/getNewArticleList`,
        method: 'get',
    })
}


export function getHotArticleList() {
    return request({
        url: `${module}/getHotArticleList`,
        method: 'get',
    })
}
