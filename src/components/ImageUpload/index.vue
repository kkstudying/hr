<template>
  <div>
    <!-- action必填指定上传接口地址，由于需要使用腾讯云，这里的是假的 -->
    <!-- fileList是管理图片的数组，需要自己定义 -->
    <el-upload
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :class="{disable:fileList.length>0}"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
    >
      <!-- class动态类名 -->
      <i class="el-icon-plus" />
      <!-- on-change  添加图片时（还没有上传成功就触发） 跟删除一样手动改数组即可 -->
      <!-- 文件状态钩子：on-remove删除时触发，自动带有文件和最新列表两个参数 -->

      <!-- 真正上传功能 -->
      <!-- before-upload 上传前校验 -->
      <!-- http-request 自定义上传函数 -->
    </el-upload>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDra6QYTAh5FE1aTFuNcrzve9QULyNWRuC',
  SecretKey: 'A9wb3JLAmBOOAgysZ4PZbPyJSTK1Woqf'
})
export default {
  data() {
    return {
      fileList: [

      ]
    }
  },
  methods: {
    onRemove(file, newFileList) {
      this.fileList = newFileList
    },
    onChange(file, newFileList) {
      this.fileList = newFileList
    },
    // 上传前校验
    beforeUpload(file) {
      const whiteList = ['image/jepg', 'image/png']
      if (whiteList.indexOf(file.type) === -1) {
        this.$message.error('当前只支持 jepg / png 文件')
        return false
      }
      // 大小校验
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过1M')
        return false
      }
    },
    httpRequest(params) {
      console.log('自定义文件上传')
      cos.putObject({
        Bucket: 'hr-1316501464',
        Region: 'ap-nanjing',
        Key: params.file.name,
        StorageClass: 'STANDARO',
        Body: params.file,
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        console.log(err || data)
        // 这里是上传完毕
        if (!err) {
          // 将腾讯云的地址替换掉fileList里面的url
          this.fileList[0].url = 'http://' + data.Location
          this.fileList[0].status = 'success'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.disable{
  ::v-deep .el-upload--picture-card{
  display:none;
}
}

</style>
