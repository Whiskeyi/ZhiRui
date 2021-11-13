<template>
  <div class="login-container">
    <!-- <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-input v-model="input" placeholder="请输入账号" />
        <el-input v-model="input" placeholder="请输入密码" />
        <el-input v-model="input" placeholder="请再次输入密码" />
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- <img class="topSide" src="../../assets/topSide.png"> -->
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left"> -->
      <el-row type="flex" justify="center" class="avatar-container">
        <el-avatar :size="120" :src="require('@/assets/login2.png')" />
      </el-row>
      <el-row type="flex" justify="center">
        <span class="loginTitle">Zhirui</span>
        <p class="loginTitle2">资产处管理端</p>
      </el-row>
      <p class="login-log">登录</p>
      <el-row type="flex" justify="center">
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入您的用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="off"
          />
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="center">
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入您的密码"
            name="password"
            tabindex="2"
            auto-complete="off"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="left">
        <el-image id="canvas" :src="VerifyCode" class="refreshCode" @click="codeRefresh" />
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="验证码" tabindex="3" auto-complete="off" />
        </el-form-item>
      </el-row>
      <el-button :loading="loading" type="primary" class="loginBtn" @click.native.prevent="handleLogin">登入</el-button>
      <el-row type="flex" justify="center">
        <span class="login-forget" @click="forgetpassword">忘记密码</span>
        <el-divider direction="vertical" />
        <span class="login-account" @click="goback">创建账号</span>
      </el-row>
    </el-form>
    <el-row type="flex" justify="center">
      <p class="bottomTitle">移动互联时代的设备管理</p>
    </el-row>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { userlogin, getVerifyCode, checkVerityCode } from '@/api/login'

export default {
  data() {
    return {
      VerifyCode: '',
      imgSrc: '',
      username: '',
      dialogVisible: false,
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      // loginRules: {
      //   username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //   password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      // },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      token: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.codeRefresh()
  },
  methods: {
    codeRefresh() {
      getVerifyCode().then(res => {
        this.VerifyCode = res.data.data.imageUrl
        console.log(this.VerifyCode)
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      if (this.loginForm.password.length < 6) {
        this.$message({
          message: '请输入6位及以上密码',
          center: true,
          type: 'error'
        })
      }
      this.username = this.loginForm.username
      sessionStorage.setItem('username', JSON.stringify(this.username))

      var params = {
        'username': this.loginForm.username,
        'password': this.loginForm.password
      }
      userlogin(params).then(res => {
        if (this.loginForm.password.length > 5 && res.data.code == '404') {
          this.$message({
            message: '密码错误',
            center: true,
            type: 'error'
          })
        }
        if (res.data.code == '403') {
          this.$message({
            message: '用户不存在，请先注册一个账号',
            center: true,
            type: 'error'
          })
        }
        // var param = {
        //   'input': this.loginForm.code
        // }
        // console.log(param)
        // checkVerityCode(param).then(res => {
        //   console.log(res.data)
        // })
        if (res.data.code == '200' && this.loginForm.password.length > 5) {
          this.token = res.data.data.token
          sessionStorage.setItem('token', JSON.stringify(this.token))
          this.$message({
            message: '登入成功',
            center: true,
            type: 'success'
          })
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goback() {
      this.$message({
        message: '请前往个人App端注册账户',
        type: 'info'
      })
      // this.$router.replace('/registered')
      // window.location.reload()
      // this.loginForm.username = ''
      // this.loginForm.password = ''
      this.dialogVisible = true
    },
    forgetpassword() {
      this.$message({
        message: '请与您的管理员取得联系',
        type: 'info'
      })
    }
  }
}

</script>

<style lang="scss">
 /* input::-webkit-input-placeholder{
    color: #222222;
  }*/
  /* 修复input 背景不协调 和光标变色 */
$bg: #ffffff;
$light_gray: #0b1013;
$cursor: #0b1013;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* 重设 element-ui css样式 */
  .el-form-item__error {
    color: #F56C6C;
    font-size: 13px;
    line-height: 1;
    padding-top: 4px;
    padding-left: 8px;
    position: absolute;
    top: 100%;
    left: 0;
  }

  .login-container {
  .el-input {
    display: inline-block;
    height: 45px;
    width: 85%;
    left: 2%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 10px;
      padding: 12px 5px 12px 5px;
      color: $light_gray;
      height: 43px;
      caret-color: $cursor;
      font-size: 16px;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: .4px solid rgb(51, 51, 51 ,0.3);
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #454545;
    margin-left: 20px;
    margin-bottom: 24px;
    width: 430px;
    height: 45px;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray:#434343;
$light_gray: #434343;

.login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    // background-color: #fafafa;
    background-size: cover;
    background: url("../../assets/logback.png") no-repeat;

  .login-form {
    position: relative;
    transform:scale(0.94);
    width: 440px;
    max-width: 100%;
    padding: 20px 35px 60px;
    margin: 0 auto;
    margin-top: 90px;
    overflow: hidden;
    border: 1px solid;
    border-radius: 10px;
    border-color:#ffffff;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .07), 0 0 6px rgba(0, 0, 0, .04);
    opacity: 0.8;
  }

  .tips {
    font-size: 17px;
    color: #434343;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 2px 0px 6px 14px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .avatar-container {
    position: relative;
    margin-bottom: 0px;
  }
  .loginBtn{
    width:94%;
    margin-top: 20px;
    margin-bottom:35px;
    margin-left: 22px;
    font-size: 16px;
  }
  .show-pwd {
    position: absolute;
    right: 18px;
    top: 2px;
    font-size: 19px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.loginTitle {
  font-size: 32px;
  font-weight: bold;
  // font-family: fantasy;
  position: absolute;
  margin-top: 5px;
}
.loginTitle2 {
  font-size: 20px;
  margin-top: 50px;
  color: #3d4146;
}
.refreshCode {
  margin-left: 20px;
  margin-top: 5px;
  cursor: pointer;
  height: 30px;
  width: 120px;
}
.login {
  &-log {
    font-size: 20px;
    // font-weight: bold;
    margin-left: 25px;
    margin-bottom: 10px;
    opacity: 0.9;
  }
  &-account {
    font-size: 16px;
    cursor: pointer;
    color: #096dd9;
  }
  &-forget {
    font-size: 16px;
    margin-left: 24px;
    cursor: pointer;
    color: #096dd9;
  }
}
.bottomTitle {
  color: #ffffff;
  font-size: 19px;
  opacity: 0.5;
  position: absolute;
}
</style>
