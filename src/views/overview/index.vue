<template>
  <div class="dashboard-container">
    <div class="dashboard-text">您好，{{ title }}，欢迎来到智睿—资产处设备管理端</div>
    <panel-group />
    <el-divider />
    <div class="dashtitle">
      <p><b>Here,you can</b></p>
      <p><b>在这里，你可以...</b></p>
    </div>
    <el-row type="flex" justify="center" align="top">
      <img class="dashImg" src="../../assets/overback.png">
    </el-row>
    <el-row type="flex" justify="center" align="top">
      <img class="dashImg2" src="../../assets/num3.png">
    </el-row>
    <el-row :gutter="250" class="dashCard" type="flex" justify="center">
      <el-col :xs="12" :sm="12" :lg="5" class="">
        <router-link to="/device/sto">
          <el-card shadow="hover">
            设备入库
          </el-card>
        </router-link>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="5" class="">
        <router-link to="/device/out">
          <el-card shadow="hover">
            设备租借
          </el-card>
        </router-link>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="5" class="">
        <router-link to="/device/dev">
          <el-card shadow="hover">
            全设备管理
          </el-card>
        </router-link>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="5" class="">
        <router-link to="/user/user">
          <el-card shadow="hover">
            组织用户管理
          </el-card>
        </router-link>
      </el-col>
    </el-row>
    <el-row :gutter="250" class="dashCard2" type="flex" justify="center">
      <el-col :xs="12" :sm="12" :lg="5" class="">
        <router-link to="/device/nested">
          <el-card shadow="hover">
            带出审批
          </el-card>
        </router-link>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="5" class="">
        <router-link to="/inventory/inventory">
          <el-card shadow="hover">
            盘点管理
          </el-card>
        </router-link>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="5" class="">
        <router-link to="/credit/credit">
          <el-card shadow="hover">
            信用中心
          </el-card>
        </router-link>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="5" class="">
        <router-link to="/risk/risk">
          <el-card shadow="hover">
            风险管控
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import { userinfo } from '@/api/login'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup
  },
  data() {
    return {
      username: '',
      title: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    const username = JSON.parse(sessionStorage.getItem('username'))
    this.title = username
    var params = { 'username': this.title }
    userinfo(params).then(res => {
      console.log(res)
    })
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
.dashtitle {
  text-align: center;
  font-size: 26px;
  // font-family: fantasy;
  color: rgb(77, 77, 77);
  opacity: 0.9;
}
.dashImg {
  transform: scale(0.9);
  z-index: -1;
  opacity: 0.90;
  position: absolute;
  transform: translateY(-17%);
}
.dashImg2 {
  margin-top: 30px;
  transform: scale(0.68);
  z-index: -1;
  opacity: 0.1;
  position: absolute;
}
.dashCard {
  margin-top:  90px;
  position: relative;
  opacity: 0.9;
}
.dashCard2 {
  margin-top:  100px;
  position: relative;
  opacity: 0.9;
}
</style>
