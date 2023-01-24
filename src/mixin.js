export default {
  // 混入的写法：可以提取一些公共的vue组件配置比如方法methods
  methods: {
    checkPermission(pointName) {
      // 所有第二层 type = 2的权限列表
      const points = this.$store.state.user.userInfo.roles.points
      return points.indexOf(pointName) !== -1
    }
  }
}
