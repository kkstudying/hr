import request from '@/utils/request'
// 获取公司信息
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}

// 获取用户信息
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

// 根据id获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 根据id更换角色
export function editRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

// 删除角色
export function delRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return request({
    method: 'put',
    url: '/sys/role/assignPrem',
    data
  })
}

