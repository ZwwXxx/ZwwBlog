const state = {
    articleId: '',
    currArticleId: null
}

const mutations = {
    CHANGE_ARTICLE(state, articleId) {
        state.articleId = articleId
    },
    SET_CURRENT_ARTICLE(state, id) {
        state.currArticleId = id
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
