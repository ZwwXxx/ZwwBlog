//由于后续需要在vue身上加vuex属性，引入vue
import Vue from 'vue'

//new vuex.store使用
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        articleId: '',
        theme: localStorage.getItem('theme') || 'light',
        currReply: null,
        currReplyName: '',
        currArticleId: null,
        currRepyTalkId: null,
        total: null,
        loading: false,
        websiteInfo:null
    },
    mutations: {
        changeArticle(state, articleId) {
            state.articleId = articleId
        },
        changeTheme(state) {
            state.theme = state.theme === 'dark' ? 'light' : 'dark'
            localStorage.setItem('theme', state.theme)
            document.documentElement.dataset.theme = state.theme
        },
        changeCurrReply(state, id) {
            state.currReply = id
        },
        changeCurrReplyTalkId(state, id) {
            state.currRepyTalkId = id
        },
        updateLoadingStatus(state,status){
            state.loading=status
        },
        setWebsiteInfo(state,value){
            state.websiteInfo=value
        }
    },
    actions: {
        openLoadingPage(context) {
            context.commit('updateLoadingStatus', true)
        },
        closeLoadingPage(context){
         setTimeout(()=>{
             context.commit('updateLoadingStatus', false)
         },500)
        }
    }
})

export default store


