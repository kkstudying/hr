<template>
  <div class="app-container">
    <PageTools :show-before="true">
      <template #before>
        共111条数据
      </template>
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
        <el-button size="small" type="primary">新增员工</el-button>
      </template>
    </PageTools>
  </div>
</template>

<script>

export default {

}
</script>

<style>

</style>
