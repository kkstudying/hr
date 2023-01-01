import request from '@/utils/request'

// 暴露一个登陆函数，在函数中返回真正的登录请求
export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}
