import { login } from '@/api/user'
import { getToken } from '@/utils/auth'
const state = {
  // 存放数据
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  // 修改数据
  setToken(state, newToken) {
    state.token = newToken
    localStorage.setItem('token', newToken)
    // setToken(newToken)
    console.log(newToken)
  },
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  }
}
const actions = {
  async login(store, loginForm) {
    const res = await login(loginForm)
    store.commit('setToken', res)
  },
  getUserInfo(store){
    
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
