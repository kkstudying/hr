import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
// axios当中有create方法，可以返回一个独立的axios实例，作用和原来的包一样，只不过配置独立于原来的包之外
// 在这个实例上进行设定，不影响原来的包配置
const service = axios.create({
  // process.env可以去得到环境变量
  // 可以在env.development里面查找
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 相应拦截
service.interceptors.response.use(res => {
  if (res.data.success) {
    return res.data.data
  } else {
    console.log('失败')
    console.log(res)
    Message.error(res.data.message)
    // promise的reject方法，可以将当前promise流程打断
    return Promise.reject(res.data.message)
  }
}, () => {
  Message.error('系统错误')
  return Promise.reject('系统错误')
})
export default service
