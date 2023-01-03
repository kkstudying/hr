<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="isShowDialog = true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="roleList">
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template v-slot="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="showEdit(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(scope.row.id)">删除</el-button>
                </template>

              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height:60px">
              <!-- 分页组件 -->
              <el-pagination
                layout="prev,pager,next"
                :page-size="pageSetting.pagesize"
                :total="total"
                @current-change="currentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyInfo.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="companyInfo.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 弹窗占位 -->
      <el-dialog :title="formData.id?'编辑':'新增'" :visible="isShowDialog" @close="btncancel">
        <el-form ref="formData" :model="formData" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="formData.description" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" @click="btnok">确定</el-button>
          <el-button @click="btncancel">取消</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList, addRole, getRoleDetail, editRole, delRole } from '@/api/setting'
export default {
  data() {
    return {
      companyInfo: {},
      pageSetting: {
        page: 1,
        pagesize: 2
      },
      roleList: [],
      total: 0,
      isShowDialog: false,
      formData: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { min: 3, max: 6, message: '长度为3-6之间', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    this.companyInfo = await getCompanyInfo(this.$store.state.user.userInfo.campany)
    this.loadPage()
  },
  methods: {
    async delRole(id) {
      await this.$confirm('是否确认删除')
      await delRole(id)
      this.loadPage()
      this.$message.success('删除成功')
    },
    async showEdit(id) {
      this.formData = await getRoleDetail(id)
      this.isShowDialog = true
    },
    currentChange(newPage) {
      console.log(newPage)
      this.pageSetting.page = newPage
      this.loadPage()
    },
    async loadPage() {
      const res = await getRoleList(this.pageSetting)
      this.roleList = res.rows
      this.total = res.total
    },
    async btnok() {
      // 表单校验
      try {
        await this.$refs.formData.validate()
        // 发请求
        if (this.formData.id) {
          await editRole(this.formData)
          this.$message.success('修改成功')
        } else {
          await addRole(this.formData)
          this.$message.success('添加成功')
        }

        this.isShowDialog = false

        this.loadPage()
        this.formData = {
          name: '',
          description: ''
        }
      } catch (error) {
        console.log('出错啦！', error)
      }
    },
    btncancel() {
      this.isShowDialog = false
      this.formData = {
        name: '',
        description: ''
      }
      // 移除校验效果
      this.$refs.formData.resetFields()
    }
  }
}
</script>

<style>

</style>
