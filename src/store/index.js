//由于后续需要在vue身上加vuex属性，引入vue
import Vue from 'vue'

//new vuex.store使用
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        articleId: '',
        theme: localStorage.getItem('theme')||'light',
    },
    mutations: {
        changeArticle(state, articleId) {
            state.articleId = articleId
        },
        changeTheme(state) {
            state.theme = state.theme === 'dark' ? 'light' : 'dark'
            localStorage.setItem('theme',state.theme)
            document.documentElement.dataset.theme=state.theme
        }
    }
})

export default store


