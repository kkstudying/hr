<template>
  <el-dialog title="新增部门" :visible="isShowDialog">
    <!-- 匿名插槽 -->
    <el-form ref="addForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择负责人">
          <el-option v-for="user in employeeList" :key="user.id" :value="user.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- 具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple, addDepts, getDeptsDetailById } from '@/api/employee'
import { editDepts } from '@/api/departments'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        instroduce: ''
      },
      employeeList: [],
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '该项不能为空', trigger: 'blur' }

        ],
        manager: [
          { required: true, message: '该项不能为空', trigger: 'blur' }

        ],
        introduce: [
          { required: true, message: '该项不能为空', trigger: 'blur' }

        ]
      }
    }
  },
  async created() {
    this.employeeList = await getEmployeeSimple()
  },
  methods: {
    async btnOk() {
      await this.$refs.addForm.validate()
      if (this.formData.id) {
        await editDepts(this.formData)
      } else {
        await addDepts({
          ...this.formData,
          pid: this.nodeData.id
        })
      }

      this.$message.success('操作成功')
      //   更新页面
      this.$emit('reloadPage')
      //   关闭弹窗
      this.$emit('closeDialog')
    },
    btnCancel() {
      this.$emit('closeDialog')
      this.formData = {
        name: '',
        code: '',
        manager: '',
        instroduce: ''
      }
      this.$refs.addForm.resetFields()
    },
    async getDeptsDetail(id) {
      this.formData = await getDeptsDetailById(id)
    }
  }
}
</script>

<style>

</style>
