// src/store/modules/auth.js
const state = {
    loginModalVisible: false
}

const mutations = {
    SET_LOGIN_MODAL_VISIBLE(state, visible) {
        state.loginModalVisible = visible
    }
}

const actions = {
    showLoginModal({ commit }) {
        console.log("正在设置值")
        commit('SET_LOGIN_MODAL_VISIBLE', true)
    },
    hideLoginModal({ commit }) {
        commit('SET_LOGIN_MODAL_VISIBLE', false)
    }
}

export default {
    namespaced: true,  // 启用命名空间
    state,
    mutations,
    actions
}
