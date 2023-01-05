import request from '@/utils/request'
// 查询企业的部门列表
export function getDepts() {
  return request({
    url: '/company/department'
  })
}
