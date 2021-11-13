<template>
  <div class="credit-container">
    <el-row>
      <el-col :span="24">
        <p class="creditTitle">信用中心</p>
      </el-col>
    </el-row>
    <el-row :gutter="30" type="flex" justify="center">
      <el-col :span="15">
        <el-card class="content">
          <el-row>
            <el-col>
              <span class="creditSize1">{{ username }}</span>
              <span class="creditSize2">信用记录</span>
              <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
                <el-col :span="24">
                  <line-chart :chart-data="lineChartData" />
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :xs="6" :sm="15" :lg="12">
              <img class="creditImg" src="../../assets/credit1.png">
            </el-col>
            <el-col :xs="10" :sm="9" :lg="8" class="list">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :timestamp="activity.timestamp"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="10" :sm="10" :lg="5">
        <el-card v-loading="loading1">
          <el-row type="flex" align="middle" justify="center">
            <el-col :span="12">
              <el-col :span="24">
                <span class="creditNum1">{{ username }}</span>
                <span class="creditNum2">的信用</span>
              </el-col>
              <el-col :span="24" style="margin-top: 2px">
                <span class="creditNum">信用评定: </span>
                <span v-if="percentage >= 0 && percentage < 20" class="creditNum-1">极差</span>
                <span v-if="percentage >= 20 && percentage < 40" class="creditNum-2">较差</span>
                <span v-if="percentage >= 40 && percentage < 60" class="creditNum-3">合格</span>
                <span v-if="percentage >= 60 && percentage < 80" class="creditNum-4">良好</span>
                <span v-if="percentage >= 80 && percentage <= 100" class="creditNum-5">优秀</span>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-progress type="dashboard" :percentage="percentage" :color="colors" />
            </el-col>
          </el-row>
        </el-card>
        <el-card v-loading="loading2" class="creditList">
          <span>信用榜单</span>
          <el-table
            :data="tableData"
            height="400"
            style="width: 100%"
          >
            <el-table-column
              prop="trueName"
              label="姓名"
              width="180"
            />
            <el-table-column
              prop="creditPoint"
              label="分数"
              width="110"
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import { userinfo } from '@/api/login'
import { creditList } from '@/api/credit'

const lineChartData = {
  newVisitis: {
    actualData: [69, 72, 75, 78, 72, 75, 78]
  }
}

export default {
  name: 'Credit',
  userData: '',
  username: '',
  components: {
    LineChart
  },
  data() {
    return {
      loading1: true,
      loading2: true,
      lineChartData: lineChartData.newVisitis,
      activities: [{
        content: '租借归还 +3分',
        timestamp: '2020-02-18 20:46',
        size: 'large',
        color: '#0bbd87'
      }, {
        content: '超时归还 -6分',
        timestamp: '2020-02-18 20:46',
        color: '#f56c6c'
      }, {
        content: '租借归还 +3分',
        timestamp: '2020-02-18 20:46',
        size: 'large',
        color: '#0bbd87'
      }, {
        content: '租借归还 +3分',
        timestamp: '2020-04-03 20:46',
        color: '#0bbd87'
      }],
      percentage: 0,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      tableData: []
    }
  },
  created() {
    const username = JSON.parse(sessionStorage.getItem('username'))
    this.username = username
    // localStorage.removeItem('username')
    var params = { 'username': this.username }
    userinfo(params).then(res => {
      this.percentage = res.data.data.creditPoint
      this.username = res.data.data.username
      this.loading1 = false
    })
    creditList().then(res => {
      console.log(res)
      this.tableData = res.data.data.list
      this.loading2 = false
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.credit-container {
  margin-left: 15px;
}
.creditTitle {
  font-size: 28px;
  margin-left: 0;
}
.creditNum1 {
  font-size: 22px;
}
.creditNum2 {
  font-size: 20px;
}
.creditNum {
  font-size: 18px;
  &-1 {
    font-size: 18px;
    font-weight: bold;
    color: #f56c6c;
  }
  &-2 {
    font-size: 18px;
    font-weight: bold;
    color: #e6a23c;
  }
  &-3 {
    font-size: 18px;
    font-weight: bold;
    color: #5cb87a;
  }
  &-4 {
    font-size: 18px;
    font-weight: bold;
    color: #1989fa;
  }
  &-5 {
    font-size: 18px;
    font-weight: bold;
    color: #6f7ad3;
  }
}
.creditList {
  margin-top: 20px;
}
.content {
  height: 740px;
}
.creditSize1 {
  font-size: 22px;
}
.creditSize2 {
  font-size: 20px;
}
.list {
  margin-top: 20px;
}
.creditImg {
  transform: scale(0.9);
}

</style>

