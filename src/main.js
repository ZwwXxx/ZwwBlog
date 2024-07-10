import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import VueRouter from "vue-router";
import router from "@/router";
import 'font-awesome/css/font-awesome.min.css'
import store from "@/store";
Vue.use(VueRouter)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
