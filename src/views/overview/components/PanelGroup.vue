<template>
  <el-row :gutter="50" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="tree" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            设备总量
          </div>
          <count-to v-if="panelData.data" :start-val="0" :end-val="panelData.data.allCount" :duration="2000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            在借数量
          </div>
          <count-to v-if="panelData.data" :start-val="0" :end-val="panelData.data.lendCount" :duration="2000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="guide" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            带出数量
          </div>
          <count-to v-if="panelData.data" :start-val="0" :end-val="panelData.data.outCount" :duration="2000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-topic">
          <svg-icon icon-class="bug" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            风险故障
          </div>
          <count-to v-if="panelData.data" :start-val="0" :end-val="panelData.data.breakCount" :duration="2000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getOverall } from '@/api/overall'
import { nestInfo } from '@/api/out'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      panelData: {
        data: {
          'allCount': 0,
          'lendCount': 0,
          'outCount': 0,
          'breakCount': 9
        }
      }
    }
  },
  mounted() {
    this.getData()
    nestInfo().then(res => {
      this.panelData.data.lendCount = res.data.data.list.length
      this.panelData.data.outCount = 3
      this.panelData.data.breakCount = 9
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getData() {
      var params = {
        'allCount': 1,
        'lendCount': 1,
        'outCount': 1,
        'breakCount': 1
      }
      getOverall(params).then(res => {
        this.panelData = res.data
        console.log(this.panelData.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 32px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    transform: scale(1.04);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background:#0073FF;
      }

      .icon-message {
        background: #666;
      }

      .icon-money {
        background: #B28FCE;
      }
      .icon-topic{
        background: #FBE251;
       }
    }

    .icon-people {
      color: #0073FF;
    }

    .icon-message {
      color: #666;
    }

    .icon-money {
      color: #B28FCE;
    }
    .icon-topic {
      color: #FBE251;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 18px 0 0 18px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 50px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
