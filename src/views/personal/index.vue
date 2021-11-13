<template>
  <div class="personal-container">
    <el-dialog
      title="密码修改"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" class="content" :model="form" label-width="80px">
        <el-form-item label="原密码">
          <el-input v-model="originPassword" placeholder="请输入原来的密码" show-password />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPassword" placeholder="请输入新的密码" show-password />
        </el-form-item>
        <el-form-item label="再次输入">
          <el-input v-model="rePassword" placeholder="请再次输出您的密码" show-password />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="更换头像"
      :visible.sync="dialogVisible2"
      width="600px"
    >
      <div class="upload">
        <el-upload
          class="upload-demo"
          drag
          action="#"
          :on-change="getImg"
          :on-error="upSuccess"
          :limit="1"
          multiple
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-row type="flex" justify="center" class="row-body" :gutter="30">
      <el-col :xs="7" :sm="7" :lg="4">
        <el-card>
          <el-row :gutter="70" type="flex" align="middle" justify="center">
            <el-col :span="6">
              <el-avatar shape="square" :size="65">
                <img :src="avatar">
              </el-avatar>
            </el-col>
            <el-col :span="18">
              <span class="title">
                <b>{{ systemName }}</b>
              </span>
              <el-button type="primary" icon="el-icon-upload" size="small" class="changeBtn" @click="avatarChange">
                更换头像
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="leftMenu">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-more" />
                <span slot="title">个人中心</span>
              </template>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-link" />
              <span slot="title">个人信息修改</span>
            </el-menu-item>
            <el-menu-item index="3" @click="dialogVisible = true">
              <i class="el-icon-lock" />
              <span slot="title">密码修改</span>
            </el-menu-item>
            <!-- <el-menu-item index="3">
              <i class="el-icon-chat-square" />
              <span slot="title">消息处理</span>
            </el-menu-item> -->
            <!-- <el-menu-item index="4">
              <i class="el-icon-setting" />
              <span slot="title">设置</span>
            </el-menu-item> -->
          </el-menu>
        </el-card>
        <el-card class="perCard">
          <span>意见反馈</span>
          <el-table
            class="feedBack"
            :data="backList"
            style="width: 100%"
            height="200"
          >
            <el-table-column
              prop="name"
              label="反馈用户"
              width="70"
              align="center"
            />
            <el-table-column
              prop="content"
              label="内容"
              align="center"
            />
          </el-table></el-card>
      </el-col>
      <el-col :span="13">
        <el-card class="card-height">
          <el-row type="flex" align="middle" justify="center">
            <el-col :span="20">
              <el-form ref="form" v-loading="formLoad" class="content" :model="form" label-width="90px">
                <el-form-item class="width1" label="用户名">
                  <el-input v-model="perInf.nickName" />
                </el-form-item>
                <el-form-item class="width3" label="姓名">
                  <el-input v-model="perInf.trueName" />
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="perInf.sex" class="width2" placeholder="请选择您的性别">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                  </el-select>
                </el-form-item>
                <el-form-item class="width4" label="生日">
                  <el-col :span="11">
                    <el-date-picker v-model="perInf.birthday" type="date" placeholder="选择您的生日" style="width: 100%;" />
                  </el-col>
                </el-form-item>
                <el-form-item class="width1" label="手机号">
                  <el-input v-model="perInf.phoneNumber" />
                </el-form-item>
                <el-form-item class="width1" label="邮箱">
                  <el-input v-model="perInf.email" />
                </el-form-item>
                <el-form-item class="width1" label="权限">
                  <el-input v-model="perInf.role" :disabled="true" />
                </el-form-item>
                <el-form-item class="width1" label="所属组织">
                  <el-input v-model="perInf.belongOrg" :disabled="true" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="submitBtn" @click="onSubmit">确认并修改</el-button>
                  <router-link to="/"><el-button>返回总览</el-button></router-link>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { userlogin } from '@/api/login'
import { rePassword, getContext, personalInfo, perChange, getAvatar, upAvatar } from '@/api/personal'

export default {
  data() {
    return {
      dialogVisible2: false,
      formLoad: true,
      upSrc: '',
      form: {
        name: 'zcj',
        trueName: '朱晨捷',
        sex: 'male',
        date: '2000-10-11',
        mail: 'qzhuchenjie@qq.com',
        phone: '18069892335'
      },
      perInf: [],
      backList: [],
      tableData: [{
        username: '',
        context: ''
      }],
      dialogVisible: false,
      originPassword: '',
      newPassword: '',
      rePassword: '',
      systemName: '',
      token: '',
      avatar: ''
    }
  },
  created() {
    const username = JSON.parse(sessionStorage.getItem('username'))
    this.systemName = username
    this.getBack()
    const token = JSON.parse(sessionStorage.getItem('token'))
    personalInfo(token).then(res => {
      console.log(res.data.data)
      this.perInf = res.data.data
      this.formLoad = false
    })
    getAvatar(token).then(res => {
      this.avatar = res.data.data
      console.log(this.avatar)
    })
  },
  methods: {
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    },
    getImg(file) {
      console.log(file)
      this.getBase64(file.raw).then(res => {
        console.log(res)
        // 拿到base64的文件流
        const token = JSON.parse(sessionStorage.getItem('token'))
        var params = {
          'data': res
        }
        upAvatar(params, token).then(res => {
          console.log(res)
        })
      })
    },
    upSuccess() {
      this.$notify({
        title: '成功',
        type: 'success',
        message: '上传成功'
      })
      this.dialogVisible2 = false
    },
    onSubmit() {
      var params = {
        'nickName': this.perInf.nickName,
        'trueName': this.perInf.trueName,
        'sex': this.perInf.sex,
        'birthday': this.perInf.birthday,
        'phoneNumber': this.perInf.phoneNumber,
        'email': this.perInf.email
      }
      const token = JSON.parse(sessionStorage.getItem('token'))
      perChange(params, token).then(res => {
        console.log(res)
        if (res.status == '200') {
          this.$notify({
            title: '成功',
            type: 'success',
            message: '修改成功'
          })
          this.$router.replace('/personal/personal')
        }
      })
    },
    getBack() {
      getContext().then(res => {
        this.backList = res.data.data.list
        console.log(this.backList)
      })
    },
    changePassword() {
      var params = {
        'username': this.systemName,
        'password': this.originPassword
      }
      userlogin(params).then(res => {
        if (res.data.code != 200) {
          this.$notify({
            title: '失败',
            type: 'error',
            message: '原密码错误'
          })
        } else {
          this.token = res.data.data.token
          if (this.newPassword == this.rePassword && this.rePassword.length >= 6) {
            var password = {
              'newPassword': this.newPassword
            }
            rePassword(password, this.token).then(res => {
              if (res.data.msg == '重置密码成功') {
                this.$notify({
                  title: '成功',
                  type: 'success',
                  message: '修改密码成功'
                })
                this.dialogVisible = false
              }
            })
          } else {
            this.$notify({
              title: '失败',
              type: 'error',
              message: '重置密码失败，请检查输入的新密码是否一致或大于六位'
            })
          }
        }
      })
    },
    avatarChange() {
      this.dialogVisible2 = true
    }
  }

}
</script>

<style scoped>
  .personal-container {
    margin-left: 20px;
  }
  .row-body {
    margin-top: 30px;
  }
  .changeBtn {
    transform: scale(0.8);
  }
  .title {
    margin-left: 10px;
  }
  .leftMenu {
    margin-top: 15px;
    height: 300px;
  }
  .card-height {
    height: 100%;
  }
  .content {
    margin-top: 30px;
  }
  .submitBtn {
    margin-top: 15px;
    margin-right: 15px;
  }
  .perCard {
    margin-top: 20px;
    height: 300px;
  }
  .feedBack {
    margin-top: 15px;
  }
  .upload {
    text-align: center;
  }
</style>

