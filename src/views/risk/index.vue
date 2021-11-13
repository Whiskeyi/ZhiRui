<template>
  <div class="risk-container">
    <el-row type="flex" justify="left" class="pageRow" :gutter="20">
      <el-col :span="8">
        <el-row>
          <el-card>
            <div class="pageTitle">安全预警</div>
            <el-row>
              <el-col :xs="6" :sm="6" :lg="7" class="warning">
                <span class="warningFont">待处理：</span>
                <countTo :start-val="startVal" :end-val="endVal1" :duration="2000" class="warningNum" />
              </el-col>
              <el-col :xs="6" :sm="6" :lg="7" class="risk">
                <span class="riskFont">风险数：</span>
                <countTo :start-val="startVal" :end-val="endVal2" :duration="2000" class="riskNum" />
              </el-col>
              <el-col :xs="6" :sm="6" :lg="7" class="deal">
                <span class="dealFont">警告数：</span>
                <countTo :start-val="startVal" :end-val="endVal3" :duration="2000" class="dealNum" />
              </el-col>
            </el-row>
          </el-card>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card>
            <span class="pageTitle">低信用警告</span>
            <el-table
              class="riskUser"
              :data="riskUser"
              height="546"
              style="width: 100%; margin-top: 15px"
              stripe
            >
              <!-- height 600 -->
              <el-table-column
                property="userName"
                label="用户名"
                width="110"
                align="center"
              />
              <el-table-column
                property="userOrg"
                label="所属组织"
                width="140"
                align="center"
              />
              <el-table-column
                property="userCredit"
                label="信用分"
                width="80"
                align="center"
              />
              <el-table-column
                label="操作"
                align="center"
              >
                <el-button size="mini" type="primary" @click="warning">警告</el-button>
              </el-table-column>
            </el-table>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="16">
        <!-- <el-row>
          <el-card v-loading="riskLoading">
            <el-col :span="14">
              <el-badge :value="1" class="item">
                <span class="pageTitle">监控拍摄</span>
              </el-badge>
              <div class="photoContainer">
                <img src="../../assets/take.png">
              </div>
            </el-col>
            <el-col style="margin-top: 45px" :span="10">
              <span class="pageTitle">检测信息</span>
              <div class="faceInfo">
                <p>是否为企业员工：是</p>
                <p>识别人姓名：虞泽毅</p>
                <p>性别：男</p>
                <p>用户名：yzy</p>
                <p>电话：13735877366</p>
                <p>邮箱地址：1527296253@qq.com</p>
                <p>所属组织：技术部</p>
                <p>信用分：100</p>
                <el-row>
                  <el-button type="primary" size="medium" @click="contact">立即联系</el-button>
                  <el-button size="medium">上一个</el-button>
                  <el-button size="medium">下一个</el-button>
                  <el-button type="info" size="medium">忽略</el-button>
                </el-row>
              </div>
            </el-col>
          </el-card>
        </el-row> -->

        <!-- margin-top: 15px; -->
        <el-row style="margin-top: 0px">
          <el-card v-loading="riskLoading">
            <span class="pageTitle">风险故障设备</span>
            <el-table
              class="riskDev"
              :data="riskDev"
              style="width: 100%; margin-top: 15px;"
              height="700"
              stripe
            >
              <el-table-column
                label="设备名称"
                width="110"
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column
                label="设备号"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.row.id }}
                </template>
              </el-table-column>
              <el-table-column
                label="问题"
                width="80"
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.row.problem }}
                </template>
              </el-table-column>
              <el-table-column
                label="设备借用人"
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.row.people }}
                </template>
              </el-table-column>
              <el-table-column
                label="故障时间"
                align="center"
                width="340"
              >
                <template slot-scope="scope">
                  {{ scope.row.breakTime }}
                </template>
              </el-table-column>
              <el-table-column
                label="联系电话"
                align="center"
                width="140"
              >
                <template slot-scope="scope">
                  {{ scope.row.phoneNumber }}
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                align="center"
                width="140"
              >
                <template slot-scope="scope">
                  <el-tag effect="plain" type="warning">
                    {{ scope.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="操作"
                align="center"
              >
                <el-button size="mini">详情</el-button>
              </el-table-column> -->
            </el-table>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import { getDevRisk } from '@/api/risk'

export default {
  components: { countTo },
  data() {
    return {
      riskLoading: true,
      riskUser: [
        {
          userName: '孔昊强',
          userOrg: '营销部',
          userCredit: '50'
        },
        {
          userName: '武皓轩',
          userOrg: '行政部',
          userCredit: '51'
        },
        {
          userName: '李聪健',
          userOrg: '客户服务部',
          userCredit: '54'
        },
        {
          userName: '郑晓啸',
          userOrg: '客户服务部',
          userCredit: '58'
        },
        {
          userName: '韩琪',
          userOrg: '营运部',
          userCredit: '63'
        },
        {
          userName: '曹立轩',
          userOrg: '财务部',
          userCredit: '63'
        },
        {
          userName: '冯炎彬',
          userOrg: '人力资源部',
          userCredit: '69'
        }
      ],
      riskDev: [
        // {
        //   devName: '音响',
        //   devId: '1024956150',
        //   devProblem: '故障',
        //   devUser: '朱晨捷',
        //   devTime: '2021-2-17',
        //   devTel: '18069892335'
        // },
        // {
        //   devName: '电脑',
        //   devId: '1024980555',
        //   devProblem: '黑屏',
        //   devUser: '虞泽毅',
        //   devTime: '2021-3-13',
        //   devTel: '13735877366'
        // },
        // {
        //   devName: '电脑椅',
        //   devId: '1017774044',
        //   devProblem: '轮子破损',
        //   devUser: '孔昊强',
        //   devTime: '2021-4-2',
        //   devTel: '17529413208'
        // },
        // {
        //   devName: '移动电源',
        //   devId: '1024878956',
        //   devProblem: '充不进电',
        //   devUser: '韩琪',
        //   devTime: '2021-4-2',
        //   devTel: '15801182357'
        // }
      ],
      startVal: 0,
      endVal1: 0,
      endVal2: 4,
      endVal3: 7
    }
  },
  mounted() {
    this.endVal3 = this.riskUser.length
    getDevRisk().then(res => {
      console.log(res)
      this.riskDev = res.data.data.list
      this.endVal2 = res.data.data.list.length
      this.riskLoading = false
    })
    // setTimeout(function() {
    //   this.riskLoading = false
    // }, 500)
    // if (!this.riskLoading) {
    //   this.riskLoading = false
    //   console.log(this.riskLoading)
    // }
  },
  methods: {
    warning() {
      this.$confirm('是否警告此员工?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '联系成功!',
          center: true
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消',
          center: true
        })
      })
    }
  }
}
</script>

<style scoped>
.risk-container {
  margin-left: 20px;
  margin-right: 20px;
}
.pageTitle {
  font-size: 24px;
}
.pageRow {
  margin-top: 15px;
}
.warning {
  background-color: #F8EFEF;
  padding: 15px;
  margin-top: 15px;
  margin-right: 15px;
}
.warningFont {
  font-size: 18px;
}
.warningNum {
  font-size: 24px;
  color: #C80000;
}
.risk{
  background-color: #FFF7D1;
  padding: 15px;
  margin-top: 15px;
  margin-right: 15px;
}
.riskFont {
  font-size: 18px;
}
.riskNum {
  font-size: 24px;
  color: #FAC800;
}
.deal{
  background-color: #F7F9FA;
  padding: 15px;
  margin-top: 15px;
  margin-right: 15px;
}
.dealFont {
  font-size: 18px;
}
.dealNum {
  font-size: 24px;
  color: #333;
}
.photoContainer {
  margin-top: 15px;
  margin-bottom: 30px;
  width: 300px;
  height: 400px;
}
.faceInfo {
  margin-top: 15px;
  font-size: 18px;
}
</style>
