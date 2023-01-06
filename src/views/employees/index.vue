<template>
  <div class="app-container">
    <PageTools :show-before="true">
      <template #before>
        共111条数据
      </template>
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
        <el-button size="small" type="primary">新增员工</el-button>
      </template>
    </PageTools>
    <el-card>
      <el-table :data="employeeList" border>
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" prop="username" sortable="" />
        <el-table-column label="工号" prop="workNumber" sortable="" />
        <el-table-column label="聘用形式" prop="formOfEmployment" sortable="" />
        <el-table-column label="部门" prop="departmentName" sortable="" />
        <el-table-column label="入职时间" prop="timeOfEntry" sortable="" />
        <el-table-column label="账户状态" prop="enableState" sortable="" />
        <el-table-column label="操作" sortable="" fixed="right" width="280" />
        <template>
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">转正</el-button>
          <el-button type="text" size="small">调岗</el-button>
          <el-button type="text" size="small">离职</el-button>
          <el-button type="text" size="small">角色</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height:60px">
        <el-pagination
          :total="total"
          :page-size="pageSetting.size"
          layout="prev,pager,next"
          @current-change="currentChange"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getEmployee } from '@/api/employee'
export default {
  data() {
    return {
      pageSetting: {
        page: 1,
        size: 5
      },
      employeeList: [],
      total: 0
    }
  },
  created() {
    this.loadPage()
  },
  methods: {
    async loadPage() {
      const res = await getEmployee(this.pageSetting)
      console.log(res)
      this.total = res.total
      this.employeeList = res.rows.map(item => {
        return {
          ...item,
          // 因为可能服务器少了个字段，可以在这临时做个判断
          enableState: item.enableState || 1
        }
      })
    },
    currentChange(newPage) {
      this.pageSetting.page = newPage
      this.loadPage()
    }
  }
}
</script>

<style>

</style>
