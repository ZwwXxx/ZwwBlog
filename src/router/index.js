import VueRouter from 'vue-router'
// 书写路由表
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/Home.vue')
    },
    {
        path: '/articleDetail/:articleId',
        name: 'ArticleDetail',
        component: () => import('../views/home/ArticleDetail')
    }
]
// 定义跳转路由后回到页面顶部，如果有缓存则滚动条保持不动
// const scrollBehavior = (to, from, saveScrollPosition) => {
//     if (saveScrollPosition && to.meta.keepAlive) {
//         return saveScrollPosition
//     }
//     return {left: 0, top: 0}
// }
export default new VueRouter({
    routes,
    // scrollBehavior
})
