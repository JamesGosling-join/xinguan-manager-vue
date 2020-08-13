<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div class="dashboard-text">用户名: {{ name }}</div>
      <pan-thumb :image="avatar+'?imageView2/1/w/80/h/80'"/>
      <el-button type="success" icon="el-icon-plus" @click="dialogVisible=true">更换头像</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">

        <!--用户头像上传-->
        <el-form>
          <!-- 用户头像 -->
          <el-form-item label="用户头像">

            <!-- 头衔缩略图 -->
            <pan-thumb :image="avatar+'?imageView2/1/w/80/h/80'"/>
            <!-- 文件上传按钮 -->
            <el-button type="primary" icon="el-icon-upload" @click="imgFormVisible=true">更换头像
            </el-button>

            <!--
              v-show：是否显示上传组件
              :key：类似于id，如果一个页面多个图片上传控件，可以做区分
              :url：后台上传的url地址
              @close：关闭上传组件
              @crop-upload-success：上传成功后的回调 -->
            <image-cropper
              v-show="imgFormVisible"
              :width="300"
              :height="300"
              :key="imgKey"
              :url="'/userservice/user/uploadImg/'+name+''"
              field="file"
              @close="close"
              @crop-upload-success="cropSuccess"/>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    name: 'Dashboard',
    components: {ImageCropper, PanThumb},
    computed: {
      ...mapGetters([
        'name',
        'avatar'
      ])
    },
    data() {
      return {
        dialogVisible: false,
        imgFormVisible: false,
        imgKey: 0
      }
    },
    methods: {
      cropSuccess(data) {
        this.$store.state.user.avatar = data
        this.imgFormVisible = false
        // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
        this.imgKey = this.imgKey + 1
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      close() {
        this.imgFormVisible = false
        // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
        this.imgKey = this.imgKey + 1
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
