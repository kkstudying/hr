<template>
  <div class="app-container">
    <PageTools :show-before="true">
      <template #before>
        共111条数据
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/employees/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportToExcel">导出</el-button>
        <el-button size="small" type="primary" @click="addEmployee">新增员工</el-button>
      </template>
    </PageTools>
    <el-card>
      <el-table :data="employeeList" border>
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" prop="username" sortable="" />
        <el-table-column label="工号" prop="workNumber" sortable="" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatEmployment" sortable="" />
        <el-table-column label="部门" prop="departmentName" sortable="" />
        <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
          <template v-slot="scope">
            <!-- 管道符  前面的数据就是他的参数 -->
            {{ scope.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState" sortable="">
          <template v-slot="scope">
            <!-- 作用域插槽可以在template上定义一个对象，接收所有子组件回传回来的数据，一般这个对象叫scope -->
            <el-switch
              v-model="scope.row.enableState"
              :active-value="1"
              :inactive-value="2"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="$router.push('/employees/detail/'+scope.row.id)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="showRole(scope.row.id)">角色</el-button>
            <el-button v-if="checkPermission('delEmployee')" type="text" size="small" @click="delEmployee(scope.row.id)">删除</el-button>
          </template>
        </el-table-column></el-table>
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
    <AddEmployee :is-show-dialog="isShowDialog" />
    <AssignRole ref="assignRole" :is-show-dialog="isShowRole" />
  </div>
</template>

<script>
import { delEmployee } from '@/api/employee'
import { getEmployee } from '@/api/employee'
import { export_json_to_excel } from '@/utils/Export2Excel'
import AddEmployee from './components/add-employee.vue'
import AssignRole from './components/assign-role.vue'
export default {
  components: { AddEmployee, AssignRole },
  data() {
    return {
      pageSetting: {
        page: 1,
        size: 5
      },
      employeeList: [],
      total: 0,
      isShowDialog: false,
      isShowRole: false
    }
  },
  created() {
    this.loadPage()
  },
  methods: {
    // 封装判断是否具有按钮权限的函数
    // 接收按钮名字，经过判断，返回布尔值
    checkPermission(pointName) {
      // 所有第二层 type = 2的权限列表
      const points = this.$store.state.user.userInfo.roles.points
      return points.indexOf(pointName) !== -1
    },
    showRole(id) {
      this.$refs.assignRole.getUserDetail(id)
      this.isShowRole = true
    },
    async delEmployee(id) {
      //  二次询问 发请求 提醒用户  更新页面
      await this.$confirm('是否确认删除？')
      await delEmployee(id)
      this.$message.success('删除成功')
      this.loadPage()
    },
    async exportToExcel() {
      const res = await getEmployee({ page: 1, size: this.total })
      console.log('res.row', res.row)
      // const header = ['姓名', '部门', '手机号']
      // const data = res.rows.map(user => {
      //   const userArr = []
      //   userArr.push(user.username)
      //   userArr.push(user.departmentName)
      //   userArr.push(user.mobile)
      //   return userArr
      // })

      const dict = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const header = Object.keys(dict)
      const data = res.rows.map(user => {
        const userArr = []
        for (const key in dict) {
          const newKey = dict[key]
          userArr.push(user[newKey])
        }
        return userArr
      })

      export_json_to_excel({
        header,
        data
      })
    },
    async loadPage() {
      const res = await getEmployee(this.pageSetting)
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
    },
    formatEmployment(row, col, cell, index) {
      if (Number(cell) === 1) {
        return '正式员工'
      } else {
        return '临时员工'
      }
      // 枚举数据是一种组织数据的形式，将所有的可能性列举出来
      // const hireType = [
      //   { id: 1, value: '正式工' },
      //   { id: 2, value: '临时工' }
      // ]
      // const obj = hireType.find(item => item.id === cell)
      // if (obj) {
      //   return obj.value
      // } else {
      //   return '其他形式'
      // }
    },
    addEmployee() {
      this.isShowDialog = true
    }
  }
}
</script>

<style>

</style>
