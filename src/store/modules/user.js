const state = {
  userInfo: null,
  token: localStorage.getItem('userToken') || '',
  userCenterVisible: false  // 添加控制个人中心弹框显示的状态
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('userToken', token)
  },
  CLEAR_USER_INFO(state) {
    state.userInfo = null
    state.token = ''
    localStorage.removeItem('userToken')
  },
  // 添加控制个人中心弹框显示的mutation
  SET_USER_CENTER_VISIBLE(state, visible) {
    state.userCenterVisible = visible
  }
}

const actions = {
  // 获取用户信息
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      import('@/api/user').then((module) => {
        module
          .getUserInfo()
          .then((res) => {
            if (res.code === 200) {
              commit('SET_USER_INFO', res.data)
              resolve(res.data)
            } else {
              reject(res)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    })
  },

  // 登录成功后设置token
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },

  // 退出登录
  logout({ commit }) {
    commit('CLEAR_USER_INFO')
  },

  // 显示个人中心弹框
  showUserCenter({ commit }) {
    commit('SET_USER_CENTER_VISIBLE', true)
  },

  // 隐藏个人中心弹框
  hideUserCenter({ commit }) {
    commit('SET_USER_CENTER_VISIBLE', false)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
