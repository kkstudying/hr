import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
export default {
  install(Vue) {
    // 这样写的文件就是一个vue插件，这个函数会在vue.use调用的时候默认执行
    console.log('插件安装', Vue)
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
