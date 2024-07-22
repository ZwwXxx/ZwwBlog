import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import router from "@/router";
import 'font-awesome/css/font-awesome.min.css'
// 主题样式
import store from "@/store";

Vue.config.productionTip = false

// // 引入MD渲染插件
// import VueMarkdownEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';

// vuepressTheme主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// vuepress代码块高亮
import Prism from 'prismjs';
// 按钮快捷复制代码块内容
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
VMdPreview.use(createCopyCodePlugin());
VMdPreview.use(vuepressTheme,{
    // Hljs: hljs
    Prism
})

// // 引入所有语言包
// import hljs from 'highlight.js'
// // github主题
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
// import '@kangc/v-md-editor/lib/theme/style/github.css'
// VMdPreview.use(githubTheme,{
//     Hljs: hljs
// })





Vue.use(VMdPreview)
// Vue.use(VueMarkdownEditor)


Vue.use(VueRouter)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
