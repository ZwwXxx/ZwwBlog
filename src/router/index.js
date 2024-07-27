import VueRouter from 'vue-router'
// 书写路由表
const routes = [
    {
        path: '/',
        component:()=>import('@/views/Layout/LayOut.vue'),
        redirect: '/home',
        children:[
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home/Home.vue')
            },
            {
                path: '/articleDetail/:articleId',
                name: 'ArticleDetail',
                component: () => import('@/views/Article/ArticleDetail.vue')
            },
            {
                path: '/message',
                name:'Message',
                component:()=>import('@/views/Message/Message.vue')
            },
            {
                path:'/category/:cname',
                name:'Category',
                component:()=>import('@/views/Category/Category.vue')
            },
            {
                path:'/friends',
                name:'Friends',
                component:()=>import('@/views/Friends/Friends.vue')
            },
            {
                path:'/talk',
                name:'Talk',
                component:()=>import('@/views/Talk/Talk.vue')
            },
            {
                path:'/album',
                name:'Album',
                component:()=>import('@/views/Album/Album.vue')
            },
            {
                path:'/photos/:id',
                name:'Photos',
                component:()=>import('@/views/Album/Photos.vue')
            },
            {
                path:'/archive',
                name:'Archive',
                component:()=>import('@/views/Archive/Archive.vue')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/Login/index.vue')
    }
]

export default new VueRouter({
    routes,
    // scrollBehavior
})
