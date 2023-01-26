import { constantRoutes, asyncRouters } from '@/router'
const state = {
  // 维护用来生成菜单的路由配置，需要静态路由跟有权限的动态路由进行合并
  routes: []
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = [...constantRoutes, ...routes]
    console.log('constantRoutes', state.routes)
  }
}
const actions = {
  filterRoutes(store, menus) {
    console.log('开始筛选路由了1111')
    // 动态路由的列表asyncRoutes 和 当前用户权限数组 menus
    // 如果路由对象的name存在于数组中，就能留下
    // return asyncRoutes.filter(item => menus.indexOf()) !== -1

    const routes = asyncRouters.filter(item => {
      // 遍历返回true则保留，返回false则扔掉
      return menus.indexOf(item.name) !== -1
      // return true
    })
    // 如果想要维护一个菜单使用的路由配置
    // 只需要将这些有权限的动态路由加上原来默认就要出现的静态路由即可
    console.log('过滤路由数组', routes)
    store.commit('setRoutes', routes)
    // 返回给外部使用
    return routes
  }

}

export default {
  // 命名空间锁
  namespaced: true,
  state,
  mutations,
  actions
}
