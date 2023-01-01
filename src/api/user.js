import request from '@/utils/request'

// 暴露一个登陆函数，在函数中返回真正的登录请求
export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}
// 获取当前登录用户基本资料
export function getProfile() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

// 根据id获取员工详细信息
export function getUserDetailById(id) {
  return request({
    methos: 'get',
    url: '/sys/user/' + id
  })
}
