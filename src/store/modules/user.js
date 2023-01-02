import { login, getProfile, getUserDetailById } from '@/api/user'
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
  },
  logout(state) {
    localStorage.removeItem('token')
    state.token = ''
    state.userInfo = {}
  }
}
const actions = {
  async login(store, loginForm) {
    console.log(11111)
    const res = await login(loginForm)
    localStorage.setItem('loginTime', Date.now())
    store.commit('setToken', res)
  },
  async getUserInfo(store) {
    const res = await getProfile()
    const detail = await getUserDetailById(res.userId)
    console.log(res)
    store.commit('setUserInfo', {
      ...res,
      ...detail
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
