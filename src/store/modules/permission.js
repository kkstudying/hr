import { asyncRoutes } from '@/router'
const state = {}
const mutations = {}
const actions = {
  filterRoutes(store, menus) {
    console.log('开始筛选路由了')
    // 动态路由的列表asyncRoutes 和 当前用户权限数组 menus
    // 如果路由对象的name存在于数组中，就能留下
    return asyncRoutes.filter(item => menus.indexOf()) !== -1
  }

}

export default {
  // 命名空间锁
  namespaced: true,
  state,
  mutations,
  actions
}
