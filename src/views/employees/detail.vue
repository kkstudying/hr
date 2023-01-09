<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="账号设置">
          <el-form ref="userForm" :model="userInfo" :rules="rules">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userInfo.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userInfo.password" type="password" />
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="btnOk">确定</el-button>
        </el-tab-pane>
        <el-tab-pane label="个人详情">
          <user-info />
        </el-tab-pane>
        <el-tab-pane label="岗位信息">
          <job-info />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserInfoById } from '@/api/employee'
import JobInfo from './components/job-info.vue'
import UserInfo from './components/user-info.vue'
export default {
  components: { JobInfo, UserInfo },
  // 如果要在页面中取得动态路由参数，也就是说类似detail/:id之类的数据放在this.$route.params
  // 如果是？a=1&b=2  这种查询字符串则放在this.$route.query里面
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    // 获取数据时，因为后端的密码经过加密，不能直接使用，去过用户需要修改，必须自己填写才行
    this.userInfo = {
      ...await getUserDetailById(this.userId),
      password: ''
    }
  },
  methods: {
    async btnOk() {
      // 校验表单  发请求  提醒用户
      await this.$refs.userForm.validate()
      await saveUserInfoById(this.userInfo)
      this.$message.success('修改成功')
    }
  }
}
</script>

<style>

</style>
