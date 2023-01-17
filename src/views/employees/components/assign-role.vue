<template>
  <el-dialog title="分配权限" :visible="isShowDialog">
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="item in roleList"
        :key="item.id"
        :label="item.id"
      >
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-button type="primary" @click="btnOk">确定</el-button>
      <el-button @click="btnCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRole } from '@/api/employee'
export default {

  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 角色总列表
      roleList: [],
      checkList: [],
      userId: ''
    }
  },
  async created() {
    const res = await getRoleList()
    console.log('res', res)
    this.roleList = res.rows
  },
  methods: {
    async getUserDetail(id) {
      console.log('数据回显需要id', id)
      const res = await getUserDetailById(id)
      console.log('回显多选结果', res)
      this.userId = id
      this.checkList = res.roleIds
    },
    async btnOk() {
      await assignRole({
        id: this.userId,
        roleIds: this.checkList
      })
      this.$message.success('修改成功')
      this.$parent.isShowRole = false
    },
    btnCancel() {
      this.checkList = []
      this.$parent.isShowRole = false
    }
  }

}
</script>

<style>

</style>
