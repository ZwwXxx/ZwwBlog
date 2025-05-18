const state = {
    websiteInfo: null
}

const mutations = {
    SET_WEBSITE_INFO(state, value) {
        state.websiteInfo = value
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
