import request from '@/utils/request'
// 查询企业的部门列表
export function getDepts() {
  return request({
    url: '/company/department'
  })
}
// 根据id修改部门详情
export function editDepts(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
// 根据id删除部门
export function delDepts(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
