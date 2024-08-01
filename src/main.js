import Vue from 'vue'
import App from './App.vue'


// 路由引入
import VueRouter from "vue-router";
import router from "@/router";

Vue.use(VueRouter)

// 图标库引入
import 'font-awesome/css/font-awesome.min.css'


import store from "@/store";

Vue.config.productionTip = false

// // 引入MD渲染插件
// import VueMarkdownEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';

// // vuepressTheme主题
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// // vuepress代码块高亮
// import Prism from 'prismjs';
// // 按钮快捷复制代码块内容
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
VMdPreview.use(createCopyCodePlugin());
// VMdPreview.use(vuepressTheme,{
//     // Hljs: hljs
//     Prism
// })

// 引入所有语言包
import hljs from 'highlight.js'
// github主题
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

VMdPreview.use(githubTheme, {
    Hljs: hljs
})
Vue.use(VMdPreview)
// Vue.use(VueMarkdownEditor)

// 引入bs5
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


// 字体引入
// import "./assets/fonts/font-SmileySans.css"
// import "./assets/fonts/font-Awesome.css"
// import "./assets/fonts/font-Awesome-All.css"
import "./assets/fonts/font-ZhuziAWan.css"
// import "./assets/fonts/font-YSHST.css"
// import "./assets/fonts/solid/font-solid.css"

// 引入element
import {
    Form, Message, FormItem, Input, Card, Image, Timeline, TimelineItem, Autocomplete, Row, Col, Pagination,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Pagination)
Vue.use(Row);
Vue.use(Col);
Vue.use( Autocomplete)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Image)
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.prototype.$message = Message;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
