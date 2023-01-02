// 全局前置路由守卫 beforeeach
import router from '@/router'
import store from '@/store'
router.beforeEach(async(to, from, next) => {
//   由token就放行
  if (store.state.user.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 为了不需要在每个用到的页面重新调用获取用户数据
      if (Object.keys(store.state.user.userInfo).length === 0) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    const whiteList = ['/login', '/404', '/test']
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
