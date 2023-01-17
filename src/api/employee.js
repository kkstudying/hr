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

// 简单完整信息员工列表
export function getEmployee(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 批量导入员工
export function importEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}

// 新增员工
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 删除员工
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 根据id保存员工基本信息
export function saveUserInfoById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

// 读取用户详情的基础信息
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

// 更新用户详情的基础信息
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

// 获取用户的岗位信息
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

// 保存岗位信息
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 设置员工角色
export function assignRole(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}
