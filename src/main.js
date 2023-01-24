import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import MyPlugin from '@/components/MyPlugin'
Vue.use(MyPlugin)

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 添加全局自定义指令
Vue.directive('fiximg', {
  inserted(el) {
    // 指令生命周期函数中，默认第一个都能获取到当前元素
    console.log('带这个指令的元素被插入到页面上')
    console.log(el)
    // 处理数据为null情况
    el.src = el.src || require('@/assets/common/login-logo.jpg')
    // 如果要将一个图片地址从普通字符串变为真正的图片，需要像以前node.js一样当作模块引入
    el.addEventListener('error', () => {
      console.log('触发err事件')
      el.src = require('@/assets/common/login-logo.jpg')
    })
  }
})

// 过滤器创建
// Vue。filter(名字，函数)
Vue.filter('formatDate', oldVal => {
  return oldVal.split('T')[0]
})

import myMixin from '@/mixin'
// 全局混入
Vue.mixin(myMixin)

// 如果存在一个封装过滤函数的文件
// import * as MyFilters from '@/filters'
// console.log(MyFilters)
// for in 遍历的是index，for of 遍历的是value
// for (const key in MyFilters) {
//   Vue.filter(key, MyFilters[key])
// }

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
