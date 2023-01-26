<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="showAddDialog('0',1)">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <!-- 表格当中如果想要显示树形，必须有一个参数row-key指定数据中独一无二的参数，放入字段名字符串即可 -->
      <el-table default-expand-all :data="permList" border row-key="id">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="scope">
            <el-button v-if="scope.row.type === 1" type="text" @click="showAddDialog(scope.row.id,2)">添加</el-button>
            <el-button type="text" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="deletePerm(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :title="formData.id?'编辑':'新增'" :visible="isShowDialog" @close="btnCancel">
        <!-- 表单 -->
        <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOk">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission, delPermission, getPermissionDetail, updatePermission } from '@/api/permisson'
import { listToTreeData } from '@/utils'
export default {
  data() {
    return {
      permList: [],
      isShowDialog: false,
      formData: {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]

      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    showAddDialog(pid, type) {
      // 因为点击的地方不一样，添加不同层级的权限
      // 要设定到formData当中，不能由用户随便改
      this.formData.pid = pid
      this.formData.type = type
      this.isShowDialog = true
    },
    async getPermissionList() {
      // 因为有父子层级关系需要进行转换
      const res = await getPermissionList()
      this.permList = listToTreeData(res, '0')
      console.log('permlist', this.permList)
    },
    async delPerm(id) {
      await this.$confirm('1111')
      await delPermission(id)
      this.$message.success('删除成功')
      this.getPermissionList()
    },
    async btnOk() {
      // 校验表单 发请求 提示用户 关闭弹窗 更新页面
      await this.$refs.perForm.validate()
      if (this.formData.id) {
        await updatePermission(this.formData)
      } else {
        await addPermission(this.formDatra)
      }

      this.$message.success('操作成功')
      this.isShowDialog = false
      this.getPermissionList()
    },
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      }
      this.$refs.perForm.resetFields()
      this.isShowDialog = false
    },
    async showEditDialog(id) {
      this.formData = await getPermissionDetail(id)
      this.isShowDialog = true
    },
    async deletePerm(id) {
      await this.$confirm(this.$t('confirmDel'))
      await delPermission(id)
      this.$message.success('删除成功')
      this.getPermissionList()
    }
  }

}
</script>

<style>

</style>
