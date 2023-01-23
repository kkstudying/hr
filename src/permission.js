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
        const menus = store.state.user.userInfo.roles.menus
        const routes = await store.dispatch('permission/filterRoutes', menus)
        // console.log('menus', menus)
        // 筛选过后（里面可以看到菜单，但是没有页面），需要追加路由
        router.addRoutes([
          ...routes,
          // 处理页面刷新后跳转到404的问题
          { path: '*', redirect: '/404', hidden: true }
        ])
        // 拿着原来的路径再重新跳一遍
        next(to.path)
        return
      }
      // 这里是登陆后跳转页面，发现没有数据，进而获取用户信息的位置
      // 执行完这一步，我们可以确认用户数据已经存在（包括权限）
      next()
      console.log('全局前置路由守卫')
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
