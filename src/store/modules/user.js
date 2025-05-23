const state = {
  userInfo: null,
  token: localStorage.getItem('token') || '',
  userCenterVisible: false  // 添加控制个人中心弹框显示的状态
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  CLEAR_USER_INFO(state) {
    state.userInfo = null
    state.token = ''
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
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
      // 先尝试从本地存储获取用户信息
      try {
        const localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (localUserInfo) {
          commit('SET_USER_INFO', localUserInfo);
          resolve(localUserInfo);
          return;
        }
      } catch (e) {
        console.error('解析本地用户信息失败', e);
      }

      // 如果本地没有或解析失败，则从服务器获取
      import('@/api/user')
        .then(userApi => userApi.getUserInfo())
        .then(res => {
          if (res.code === 200) {
            commit('SET_USER_INFO', res.data)
            // 保存到本地存储
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            resolve(res.data)
          } else {
            // token无效时清除用户信息
            if (res.code === 500 && res.msg && res.msg.includes('token无效')) {
              commit('CLEAR_USER_INFO')
            }
            reject(res)
          }
        })
        .catch(error => {
          // 出现异常时也清除用户信息
          commit('CLEAR_USER_INFO')
          reject(error)
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
