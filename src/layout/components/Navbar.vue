<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <a class="currentTime">
      <span>
        {{ nowDate }}
      </span>
      <span>
        {{ nowTime }}
      </span>
      <span>
        {{ nowWeek }}
      </span>
    </a>
    <svg-icon icon-class="refresh" class-name="navbar-icon" @click="toRefresh" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatarImg" class="user-avatar">
          <!-- <img src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/personal/personal">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getAvatar } from '@/api/personal'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      avatarImg: '',
      nowDate: '',
      nowTime: '',
      nowWeek: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  mounted() {
    this.currentTime()
    const token = JSON.parse(sessionStorage.getItem('token'))
    getAvatar(token).then(res => {
      this.avatarImg = res.data.data
      console.log(res.data.data)
    })
  },
  beforeDestroy: function() {
    if (this.getDate) {
      console.log('销毁定时器')
      clearInterval(this.getDate)
    }
  },
  methods: {
    currentTime() {
      setInterval(this.getDate, 500)
    },
    getDate: function() {
      var _this = this
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const week = new Date().getDay()
      const hh = new Date().getHours()
      const mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      if (week === 1) {
        this.nowWeek = '周一'
      } else if (week === 2) {
        this.nowWeek = '周二'
      } else if (week === 3) {
        this.nowWeek = '周三'
      } else if (week === 4) {
        this.nowWeek = '周四'
      } else if (week === 5) {
        this.nowWeek = '周五'
      } else if (week === 6) {
        this.nowWeek = '周六'
      } else {
        this.nowWeek = '周日'
      }
      _this.nowTime = hh + ':' + mf
      _this.nowDate = yy + '/' + mm + '/' + dd
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    toRefresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          transform: scale(1.5);
          font-size: 12px;
        }
      }
    }
  }
}
.navbar-icon{
  position: absolute;
  right: 100px;
  top: 32%;
  transform: scale(1.3);
  cursor: pointer;
  opacity: 1;
}
.currentTime {
  font-size: 14px;
  position: absolute;
  right: 130px;
  top: 32%;
  color: #a7a7a7;
}
</style>
