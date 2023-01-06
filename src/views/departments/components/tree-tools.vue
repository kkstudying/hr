<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px;width: 100%;">
    <el-col>{{ nodeData.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ nodeData.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span>操作<i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addDepts">新建部门</el-dropdown-item>
              <el-dropdown-item v-if="!isCompany" @click.native="editDepts">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isCompany" @click.native="delDepts">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepts } from '@/api/departments'
export default {
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    isCompany: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    addDepts() {
      console.log('点击新增打印nodeData', this.nodeData)
      this.$emit('showAddDialog', this.nodeData)
    },
    editDepts() {
      this.$emit('showEditDialog', this.nodeData)
    },
    async delDepts() {
      await this.$confirm('是否确认删除')
      await delDepts(this.nodeData.id)
      this.$message.success('删除成功')
      this.$emit('reloadPage')
    }
  }
}
</script>

<style>

</style>
