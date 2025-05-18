

const state = {
    theme: localStorage.getItem('theme') || 'light',
    loading: false
}

const mutations = {
    CHANGE_THEME(state) {
        state.theme = state.theme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', state.theme)
        document.documentElement.dataset.theme = state.theme
    },
    UPDATE_LOADING_STATUS(state, status) {
        state.loading = status
    }
}

const actions = {
    openLoading({ commit }) {
        commit('UPDATE_LOADING_STATUS', true)
    },
    closeLoading({ commit }) {
        setTimeout(() => {
            commit('UPDATE_LOADING_STATUS', false)
        }, 500)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
