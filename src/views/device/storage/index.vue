<template>
  <div v-loading="pageLoading" class="storage-container">
    <el-row type="flex" justify="center">
      <p><b>设备入库</b></p>
    </el-row>
    <el-steps :active="active" finish-status="success" align-center>
      <el-step icon="el-icon-edit" title="步骤 1" description="输入设备信息" />
      <el-step icon="el-icon-finished" title="步骤 2" description="信息确认" />
    </el-steps>
    <div v-show="show1" class="verifyContainer">
      <el-row type="flex" justify="center" align="bottom">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="设备名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="设备数量">
            <el-col :span="10"><el-input-number v-model="form.num" controls-position="right" /></el-col>
            <el-col :span="4"><span class="fontStyle">RFID卡号</span></el-col>
            <el-col :span="8"><el-input v-model="form.cardNum" /></el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="请使用RFID设备读取卡号" placement="bottom">
                <svg-icon icon-class="rfid" class-name="rfid-icon" />
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label="入库时间">
            <el-col :span="11">
              <el-date-picker v-model="form.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker v-model="form.date2" placeholder="选择时间" value-format="HH:mm:ss" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="设备区分">
            <el-radio-group v-model="form.resource">
              <el-radio label="贵重设备" />
              <el-radio label="私密设备" />
              <el-radio label="常规设备" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设备类别">
            <el-select v-model="form.region" placeholder="请选择设备类别">
              <el-option label="办公设备" value="办公设备" />
              <el-option label="电子设备" value="电子设备" />
              <el-option label="文档管理设备" value="文档管理设备" />
              <el-option label="事务设备" value="事务设备" />
              <el-option label="其它设备" value="其它设备" />
            </el-select>
          </el-form-item>
          <el-form-item label="描述备注">
            <el-input v-model="form.desc" :rows="5" type="textarea" />
          </el-form-item>
          <el-row>
            <el-col :span="13">
              <el-form-item label="设备图片">
                <el-button size="small" type="primary" @click="imgGet">获取图片</el-button>
                <div class="tipClass">点击调用摄像头获取照片</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="" prop="imgSrc">
            <img v-if="imgSrc" :src="imgSrc" style="width: 400px;height: 300px;">
          </el-form-item>
          <el-dialog
            title="拍照上传"
            :visible.sync="visible"
            width="1065px"
            @close="onCancel"
          >
            <div class="box">
              <video id="videoCamera" class="canvas" :width="videoWidth" :height="videoHeight" autoPlay />
              <canvas id="canvasCamera" class="canvas" :width="videoWidth" :height="videoHeight" />
            </div>
            <div slot="footer">
              <el-button
                icon="el-icon-camera"
                size="small"
                @click="drawImage"
              >
                拍照
              </el-button>
              <el-button
                v-if="os"
                icon="el-icon-video-camera"
                size="small"
                @click="getCompetence"
              >
                打开摄像头
              </el-button>
              <el-button
                v-else
                icon="el-icon-switch-button"
                size="small"
                @click="stopNavigator"
              >
                关闭摄像头
              </el-button>
              <el-button
                icon="el-icon-refresh"
                size="small"
                @click="resetCanvas"
              >
                重置
              </el-button>
              <el-button
                icon="el-icon-circle-close"
                size="small"
                @click="onCancel"
              >
                完成
              </el-button>
            </div>
          </el-dialog>
        </el-form>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="next1">下一步</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
    </div>

    <div v-show="show3" class="verifyContainer">
      <el-row type="flex" justify="center" align="bottom">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备名称">
                <el-input v-model="form.name" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备数量">
                <el-input-number v-model="form.num" :disabled="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <el-form-item label="RFID卡号">
                <el-input v-model="form.cardNum" :disabled="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="入库时间">
                <el-input v-model="form.date" :disabled="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备区分">
                <el-input v-model="form.resource" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备类别">
                <el-input v-model="form.region" :disabled="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="设备图片" prop="imgSrc">
            <el-image :src="imgSrc" style="width: 280px;height: 210px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </el-form-item>
          <el-form-item label="描述备注">
            <el-input v-model="form.desc" :rows="4" type="textarea" :disabled="true" />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="success">确定入库</el-button>
        <el-button @click="back2">上一步</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { devStorage } from '@/api/device'

export default {
  data() {
    return {
      fileList: [],
      active: 0,
      urlPic: '',
      contain: 'contain',
      show1: true,
      show3: false,
      form: {
        name: '',
        region: '',
        date: '',
        date2: '',
        delivery: false,
        resource: '常规设备',
        desc: '',
        num: 1,
        cardNum: ''
      },
      visible: false,
      pageLoading: false,
      os: false,
      thisVideo: null,
      thisContext: null,
      thisCancas: null,
      videoWidth: 500,
      videoHeight: 400,
      postOptions: [],
      CertCtl: '',
      ids: [],
      multiple: true,
      total: 0,
      akworkerList: [],
      workerTypeOptions: [],
      title: '',
      open: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        imgSrc: undefined
      },
      imgSrc: '',
      rules: {
      }
    }
  },
  methods: {
    next1() {
      if (this.active++ > 2) this.active = 0
      else if (!this.form.name && !this.form.num && !this.form.cardNum) {
        this.$message({
          message: '请返回上一步完成表单填写',
          type: 'warning',
          center: true
        })
      }
      this.show1 = !this.show1
      this.show3 = !this.show3
    },
    back1() {
      this.active--
      this.show1 = !this.show1
      this.show3 = !this.show3
    },
    back2() {
      this.active--
      this.show3 = !this.show3
      this.show1 = !this.show1
    },
    success() {
      this.pageLoading = true
      this.$router.replace('/device/sto')
      this.show1 = !this.show1
      this.show3 = !this.show3
      this.active = 0
      var params = {
        'id': this.form.cardNum,
        'name': this.form.name,
        'number': this.form.num,
        'enterTime': this.form.date + ' ' + this.form.date2,
        'distinguish': this.form.resource,
        'type': this.form.region,
        'describe': this.form.desc,
        'fileName': 'sb.',
        'fileType': 'png',
        'data': this.imgSrc
      }
      devStorage(params).then(res => {
        console.log(res)
        if (res.status == '200') {
          this.$router.replace('/device/sto')
          this.$notify({
            title: '成功',
            message: '入库成功',
            type: 'success'
          })
        }
      })
      this.pageLoading = false
      // window.location.reload()

      // setTimeout(function() {
      //   window.location.reload()
      // }, 500
      // )
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 $ { file.name }？`)
    },
    cancel() {
      window.location.reload()
    },
    imgGet() {
      this.visible = true
      this.getCompetence()
    },
    onCancel() {
      this.visible = false
      this.stopNavigator()
    },
    getCompetence() {
      this.$nextTick(() => {
        const _this = this
        this.os = false
        this.thisCancas = document.getElementById('canvasCamera')
        this.thisContext = this.thisCancas.getContext('2d')
        this.thisVideo = document.getElementById('videoCamera')
        if (navigator.mediaDevices === undefined) {
          navigator.menavigatordiaDevices = {}
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function(constraints) {
            const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
            }
            return new Promise(function(resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        const constraints = {
          audio: false,
          video: { width: _this.videoWidth, height: _this.videoHeight, transform: 'scaleX(-1)' }
        }
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream
          } else {
            _this.thisVideo.src = window.URL.createObjectURL(stream)
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            _this.thisVideo.play()
          }
        })
      })
    },
    drawImage() {
      this.thisContext.drawImage(this.thisVideo, 0, 0, this.videoWidth, this.videoHeight)
      this.imgSrc = this.thisCancas.toDataURL('image/png')
    },
    clearCanvas(id) {
      const c = document.getElementById(id)
      const cxt = c.getContext('2d')
      cxt.clearRect(0, 0, c.width, c.height)
    },
    resetCanvas() {
      this.imgSrc = ''
      this.clearCanvas('canvasCamera')
    },
    stopNavigator() {
      if (this.thisVideo && this.thisVideo !== null) {
        this.thisVideo.srcObject.getTracks()[0].stop()
        this.os = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.storage {
  &-container {
    margin: 30px;
    font-size: 24px;
  }
}
.verifyContainer {
    height: auto;
    margin-top: 30px;
}
.fontStyle {
    font-size: 14px;
    color: #606266;
    font-weight: 700;
}
.rfid-icon {
  margin-left: 10px;
  transform: scale(2.3);
}
.tipClass {
  font-size: 13px;
  color: #606266;
}
</style>
