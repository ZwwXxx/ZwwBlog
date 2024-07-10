import VueRouter from 'vue-router'
// 书写路由表
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name:'home',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/articleDetail/:articleId',
        name: 'ArticleDetail',
        component: () => import('../views/home/ArticleDetail')
    }
]

export default new VueRouter({
    routes
})
