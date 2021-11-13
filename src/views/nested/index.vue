<template>
  <div class="nested-container">
    <div class="nestedTitle">
      <svg-icon icon-class="nested1" class="nestedIcon" />
      <span>带出审批</span>
      <!-- <el-checkbox v-model="checked1" class="checked">组织待审批</el-checkbox> -->
      <!-- <el-checkbox v-model="checked2" class="checked">个人待审批</el-checkbox> -->
    </div>
    <el-tabs class="tabs" :tab-position="tabPosition" style="height: 100%;">
      <el-tab-pane label="组织带出审批">
        <el-row type="flex" justify="center" class="userTable">
          <el-col :span="23">
            <el-table
              ref="singleTable"
              :data="tableData1"
              style="width: 100%"
              stripe
            >
              <el-table-column
                label="序号"
                type="index"
                width="80"
              />
              <el-table-column
                property="name1"
                label="组织名"
                width="100"
              />
              <!-- <el-table-column
                property="phone1"
                label="联系方式"
                width="150"
              /> -->
              <el-table-column
                property="device1"
                label="设备名称"
                width="120"
              />
              <el-table-column
                property="num1"
                label="数量"
                width="60"
              />
              <el-table-column
                property="status1"
                label="设备状态"
                width="100"
              />
              <el-table-column
                property="desc"
                label="描述"
                width="150"
              />
              <el-table-column
                property="date1"
                label="申请时间"
                width="160"
              />
              <el-table-column
                property="time1"
                label="归还时间"
                width="160"
              />
              <el-table-column
                property="check1"
                label="审批进度"
                width="100"
                prop="check1"
                :filters="[{ text: '已审批', value: '已审批' }, { text: '待审批', value: '待审批' }]"
                :filter-method="filterCheck"
                filter-placement="bottom-end"
              />
              <el-table-column
                property="reason"
                label="事由"
                width="150"
                align="center"
              />
              <el-table-column
                label="操作"
                align="center"
              >
                <el-button type="primary" size="mini" @click="success">通过审批</el-button>
                <el-button type="danger" size="mini" @click="back">驳回</el-button>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- <el-tab-pane label="个人带出审批">
        <el-row type="flex" justify="center" class="userTable">
          <el-col :span="23">
            <el-table
              ref="singleTable"
              :data="tableData2"
              style="width: 100%"
              stripe
            >
              <el-table-column
                label="序号"
                type="index"
                width="100"
              />
              <el-table-column
                property="name2"
                label="员工名称"
                width="120"
              />
              <el-table-column
                property="phone2"
                label="联系方式"
                width="200"
              />
              <el-table-column
                property="date2"
                label="申请时间"
                width="200"
              />
              <el-table-column
                property="device2"
                label="设备名称"
                width="140"
              />
              <el-table-column
                property="num2"
                label="数量"
                width="120"
              />
              <el-table-column
                property="time2"
                label="申请时长"
                width="140"
              />
              <el-table-column
                property="status2"
                label="设备状态"
                width="100"
              />
              <el-table-column
                property="check2"
                label="审批进度"
                width="100"
              />
              <el-table-column
                label="操作"
                align="center"
              >
                <el-button type="primary" size="mini" @click="success">通过审批</el-button>
                <el-button type="danger" size="mini" @click="back">驳回</el-button>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane> -->
    </el-tabs>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="100"
    />
  </div>
</template>

<script>

import { nestList } from '@/api/out'

export default {
  data() {
    return {
      checked1: false,
      checked2: false,
      tabPosition: 'left',
      tableData1: [
        {
          name1: '会员服务部',
          phone1: '18312372328',
          date1: '2021-03-02',
          device1: '剪辑设备',
          num1: 1,
          time1: '2022-07-02',
          status1: '正常',
          check1: '待审批',
          reason: '工作需要',
          desc: 'MacBook Pro M1'
        },
        {
          name1: '客户服务部',
          phone1: '18170244543',
          date1: '2021-02-09',
          device1: '鼠标',
          num1: 8,
          time1: '2021-04-01',
          status1: '正常',
          check1: '待审批',
          reason: '部门活动所需',
          desc: 'Xiaomi'
        },
        {
          name1: '技术部',
          phone1: '17342372328',
          date1: '2021-02-02',
          device1: '音响',
          num1: 1,
          time1: '2022-02-02',
          status1: '正常',
          check1: '已审批',
          reason: '工作需要',
          desc: ''
        },
        {
          name1: '客户服务部',
          phone1: '17170014643',
          date1: '2021-02-02',
          device1: '笔',
          num1: 100,
          time1: '2021-04-01',
          status1: '正常',
          check1: '待审批',
          reason: '部门活动所需',
          desc: ''
        },
        {
          name1: '技术部',
          phone1: '17250584526',
          date1: '2021-02-15',
          device1: '笔记本电脑',
          num1: 2,
          time1: '2021-03-02',
          status1: '正常',
          check1: '待审批',
          reason: '外出调研工作需要',
          desc: ''
        },
        {
          name1: '行政部',
          phone1: '17247584500',
          date1: '2021-03-02',
          device1: '鼠标',
          num1: 10,
          time1: '2021-05-02',
          status1: '正常',
          check1: '待审批',
          reason: '正常使用',
          desc: ''
        },
        {
          name1: '技术部',
          phone1: '15254648238',
          date1: '2021-02-24',
          device1: '单反相机',
          num1: 5,
          time1: '2021-04-22',
          status1: '正常',
          check1: '已审批',
          reason: '外出调研需要',
          desc: 'Canon 5D'
        },
        {
          name1: '人力资源部',
          phone1: '15084198430',
          date1: '2021-02-18',
          device1: '电脑椅',
          num1: 3,
          time1: '2023-03-02',
          status1: '正常',
          check1: '待审批',
          reason: '组织需要',
          desc: ''
        },
        {
          name1: '行政部',
          phone1: '15076843945',
          date1: '2021-03-16',
          device1: '打印机',
          num1: 2,
          time1: '2021-12-02',
          status1: '正常',
          check1: '待审批',
          reason: '工作需要',
          desc: ''
        }
      ],
      tableData2: []
    }
  },
  mounted() {
    nestList().then(res => {
      console.log(res)
    })
  },
  methods: {
    success() {
      this.$confirm('此操作将通过该设备带出申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '审批成功',
          type: 'success'
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          type: 'info',
          message: '已取消审批'
        })
      })
    },
    back() {
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: ''
      }).then(({ value }) => {
        this.$notify({
          title: '成功',
          type: 'success',
          message: '驳回成功'
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          type: 'info',
          message: '取消输入'
        })
      })
    },
    filterCheck(value, row) {
      return row.check1 === value
    }
  }
}
</script>

<style scoped>
  .nested-container {
    margin-top: 20px;
  }
  .nestedTitle {
  font-size: 24px;
  margin-top: 30px;
  margin-left: 30px;
  }
  .nestedIcon {
  margin-right: 15px;
  opacity: 0.7;
  }
  .tabs {
    margin-top: 30px;
  }
  .pagination {
    margin-top: 40px;
    margin-left: 20px;
  }
  .checked {
    margin-left: 20px;
  }
</style>

