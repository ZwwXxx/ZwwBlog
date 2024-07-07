import VueRouter from 'vue-router'
import Home from "@/views/Home/index.vue";
// 书写路由表
const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home',
    }
]

export default new VueRouter({
    routes
})
