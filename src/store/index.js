import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import article from './modules/article'
import comment from './modules/comment'
import site from './modules/site'
import auth from '@/store/modules/auth'
import user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    article,
    comment,
    site,
    auth,
    user
  }
})
