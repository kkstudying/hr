<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employee'
export default {
  methods: {
    // 这个函数作为成功的回调传入了子组件
    // 每当上传excel加载完毕时，就能够在这获取到数据data
    // 其中data.header是表头，data.results是结果数组
    async onSuccess(data) {
      const dict = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const newData = data.results.map(user => {
        const newUser = {}
        for (const key in user) {
          const newKey = dict[key]
          let value = user[key]
          if (newKey === 'timeOfEntry' || newKey === 'correctionTime') {
            // 调用工具函数得到的是字符串
            const timeStr = this.formatExcelTime(value)
            value = new Date(timeStr) // 转换成日期对象
          }

          newUser[newKey] = value
        }
        return newUser
      })

      // 发送请求批量导入
      await importEmployee(newData)
      this.$message.success('导入成功')
      this.$router.back()
    },
    // 专门处理excel时间问题工具
    formatExcelTime(num, format = '-') {
      num = Number(num)
      let millisecond = 0
      if (num > 60) {
        millisecond = (num - 25569) * 60 * 60 * 24 * 1000
      } else {
        millisecond = (num - 25568) * 60 * 60 * 24 * 1000
      }
      const date = new Date(millisecond)
      const yy = date.getFullYear()
      const mm = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return yy + format + mm + format + dd // 返回日期字符串
    }
  }
}
</script>

<style>

</style>
