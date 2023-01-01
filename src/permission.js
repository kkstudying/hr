// 全局前置路由守卫 beforeeach
import router from '@/router'
import store from '@/store'
router.beforeEach((to, from, next) => {
//   由token就放行
  if (store.state.user.token) {
    if (to.path === '/login') {
      next('/')
    } else {
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
