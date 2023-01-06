import request from '@/utils/request'
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 新增部门
export function addDepts(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 根据id获取部门详情
export function getDeptsDetailById(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 简单获取员工列表
export function getEmployee(params) {
  return request({
    url: '/sys/user',
    params
  })
}
