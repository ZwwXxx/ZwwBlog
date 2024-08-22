import request from "@/utils/request";


const module = '/user'

// 获取角色分页列表
export function login(data) {
    return request({
        url: `${module}/login`,
        method: 'post',
        // params:  queryParams  //使用  @RequestParam("name") String name,接收或者是@PathVariable("前端键值") Integer后端形参名
        data // 使用@RequestBody接收
    })
}
