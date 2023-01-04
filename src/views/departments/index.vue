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
import TreeTools from './components/tree-tools.vue'
export default {
  components: { TreeTools },
  data() {
    return {
      companyInfo: {
        name: '传智播客',
        manager: '负责人'
      },
      depts: [
        {
          name: '财务部',
          manager: '张三'
        },
        {
          name: '技术部',
          manager: '张三',

          children: [
            {
              name: 'java研发',
              manager: '张三'

            },
            {
              name: '前端研发',
              manager: '张三'

            }
          ]
        },
        {
          name: '人事部',
          manager: '李四'
        }
      ]
    }
  }
}
</script>

<style>

</style>
