<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="组织结构">
          <TreeTools
            :is-company="true"
            :node-data="companyInfo"
            @showAddDialog="addDepts"
          />
        </el-tab-pane>

        <hr>
        <!-- 部门树形结构 -->
        <el-tree
          :expand-on-click-node="false"
          :data="depts"
          :prop="{label:'name'}"
          default-expand-all
        >
          <!-- 自定义插槽 -->
          <template v-slot="scoped">
            <TreeTools
              :is-company="false"
              :node-data="scoped.data"
              @showEditDialog="editDepts"
              @showAddDialog="addDepts"
              @reloadPage="getDepts"
            />
          </template>
        </el-tree>
      </el-tabs>
    </el-card>
    <AddDepts
      ref="editDialog"
      :is-show-dialog="isShowDialog"
      :node-data="nodeData"
      @reloadPage="getDepts"
      @closeDialog="isShowDialog=false"
    />
  </div>
</template>

<script>
import { getDepts } from '@/api/departments'
import TreeTools from './components/tree-tools.vue'
import AddDepts from './components/add-depts.vue'
export default {
  components: { TreeTools, AddDepts },
  data() {
    return {
      companyInfo: {
        name: '传智播客',
        manager: '负责人',
        id: ''
      },
      depts: [],
      isShowDialog: false,
      nodeData: {}
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
    },
    addDepts(nodeData) {
      this.isShowDialog = true
      this.nodeData = nodeData
    },
    editDepts(nodeData) {
      this.nodeData = nodeData
      this.isShowDialog = true
      this.$refs.editDialog.getDeptsDetail(nodeData.id)
    }
  }
}
</script>

<style>

</style>
