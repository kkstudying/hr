<template>
  <el-dialog title="新增员工" :visible="isShowDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="formData" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width=90%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" style="width=90%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width=90%" placeholder="请输入入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width=90%" placeholder="请选择">
          <el-option :value="1" label="正式" />
          <el-option :value="2" label="非正式" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width=90%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width=90%" placeholder="请输入部门" @focus="isShowTree=true" />
        <el-tree
          v-if="isShowTree"
          :expand-on-click-node="false"
          :data="depts"
          :props="{label:'name'}"
          default-expand-all
          @node-click="nodeClick"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width=90%" placeholder="请输入转正时间" />
      </el-form-item>
    </el-form>
    <!-- 插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepts } from '@/api/departments'
import { listToTreeData } from '@/utils'
import { addEmployee } from '@/api/employee'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位' }
        ],
        mobile: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '转正时间', trigger: 'blur' }
        ]
      },
      depts: [],
      isShowTree: false
    }
  },
  created() {
    this.changeEmployee()
  },
  methods: {
    nodeClick(data) {
      this.formData.departmentName = data.name
      this.isShowTree = false
    },
    async changeEmployee() {
      const res = await getDepts()
      // console.log(res.depts)
      this.depts = listToTreeData(res.depts, '')
    },
    async btnOk() {
    //  表单验证 发送请求  关闭弹窗  提醒用户  更新页面
      await this.$refs.formData.validate()
      await addEmployee(this.formData)
      // this.$parent可以取得父组件的实例
      this.$parent.isShowDialog = false
      this.$message.success('添加成功')
      this.$parent.loadPage()
    },
    btnCancel() {
      // 清理数据 清理报错  关闭弹窗
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.formData.resetFields()
      this.$parent.isShowDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree{
  position:absolute;
  z-index:9;
  width:90%;
  border:1px solid #999;
  overflow:auto;
  height: 200px;
}
</style>
