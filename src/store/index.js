//由于后续需要在vue身上加vuex属性，引入vue
import Vue from 'vue'

//new vuex.store使用
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        articleId: ''
    },
    mutations: {
        changeArticle(state, articleId) {
            state.articleId = articleId
        }
    }
})

export default store


