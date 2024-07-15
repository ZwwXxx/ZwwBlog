import VueRouter from 'vue-router'
// 书写路由表
const routes = [
    {
        path: '/',
        component:()=>import('../views/layout/index.vue'),
        redirect: '/home',
        children:[
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/Home.vue')
            },
            {
                path: '/articleDetail/:articleId',
                name: 'ArticleDetail',
                component: () => import('../views/home/ArticleDetail')
            },
        ]
    },
    {
        path: '/login',
        component: () => import('../views/login/index.vue')
    }
]

export default new VueRouter({
    routes,
    // scrollBehavior
})
