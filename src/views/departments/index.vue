<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="组织结构">
          <TreeTools :node-data="companyInfo" />
        </el-tab-pane>

        <hr>
        <!-- 部门树形结构 -->
        <el-tree
          :data="depts"
          :prop="{label:'name'}"
          default-expand-all
        >
          <!-- 自定义插槽 -->
          <template v-slot="scoped">
            <TreeTools :node-data="scoped.data" />
          </template>
        </el-tree>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getDepts } from '@/api/departments'
import TreeTools from './components/tree-tools.vue'
export default {
  components: { TreeTools },
  data() {
    return {
      companyInfo: {
        name: '传智播客',
        manager: '负责人'
      },
      depts: []
    }
  },
  created() {
    this.getDepts()
  },
  methods: {
    async getDepts() {
      const res = await getDepts()
      console.log(res)
      this.depts = this.listToTreeData(res.depts, '')
    },
    listToTreeData(list, id) {
      const res = []
      list.forEach(element => {
        if (element.pid === id) {
          element.children = this.listToTreeData(list, element.id)
          res.push(element)
        }
      })
      return res
    }
  }
}
</script>

<style>

</style>
