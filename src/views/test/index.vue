<template>
  <div>
    <!-- rules属性传入约定的验证规则，prop设置为需要校验的字段名 -->
    <el-form :model="formData" :rules="rules">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: [{ required: true, message: '该项不能为空', trigger: 'blur' },
          { pattern: /^[3-9][0-9]{9}$/, message: '请输入正确手机号', trigger: 'blur' }],
        password: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { min: 3, max: 12, message: '密码必须在3-12位之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      console.log(this.formData)
    }
  }
}
</script>
