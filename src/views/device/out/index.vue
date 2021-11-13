<template>
  <div class="nested-container">
    <div class="nestedTitle">
      <svg-icon icon-class="nested1" class="nestedIcon" />
      <span>借用审批</span>
      <!-- <el-checkbox v-model="checked1" class="checked">组织待审批</el-checkbox> -->
      <!-- <el-checkbox v-model="checked2" class="checked">个人待审批</el-checkbox> -->
    </div>
    <el-tabs class="tabs" :tab-position="tabPosition" style="height: 100%;">
      <el-tab-pane label="组织借用审批">
        <el-row type="flex" justify="center" class="userTable">
          <el-col :span="23">
            <el-table
              ref="singleTable"
              v-loading="nestLoad"
              :data="tableData1"
              style="width: 100%"
              stripe
            >
              <el-table-column
                label="序号"
                type="index"
                width="50"
              />
              <el-table-column
                label="组织名"
                width="100"
              >
                <template slot-scope="scope">
                  {{ scope.row.orgName }}
                </template>
              </el-table-column>
              <el-table-column
                label="设备名称"
                width="120"
              >
                <template slot-scope="scope">
                  {{ scope.row.EquName }}
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                width="60"
              >
                <template slot-scope="scope">
                  {{ scope.row.lendNumber }}
                </template>
              </el-table-column>
              <el-table-column
                label="设备状态"
                width="100"
              >
                <template slot-scope="scope">
                  {{ scope.row.equStatus }}
                </template>
              </el-table-column>
              <el-table-column
                label="申请人"
                width="120"
              >
                <template slot-scope="scope">
                  {{ scope.row.lendPeo }}
                </template>
              </el-table-column>
              <el-table-column
                label="申请时间"
                width="170"
              >
                <template slot-scope="scope">
                  {{ scope.row.startTime }}
                </template>
              </el-table-column>
              <el-table-column
                property="time1"
                label="归还时间"
                width="170"
              >
                <template slot-scope="scope">
                  {{ scope.row.returnTime }}
                </template>
              </el-table-column>
              <el-table-column
                label="审批进度"
                width="100"
                :filters="[{ text: '审批中', value: '审批中' }, { text: '审批通过', value: '审批通过' }, { text: '审批失败', value: '审批失败'}]"
                :filter-method="filterCheck"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <el-tag :type="scope.row.lend_status | statusFilter">{{ scope.row.lend_status }}</el-tag>
                  <!-- {{ scope.row.lend_status }} -->
                </template>
              </el-table-column>
              <el-table-column
                label="事由"
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.row.reason }}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="330"
              >
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="success(scope.row)">通过审批</el-button>
                  <el-button size="mini" @click="back(scope.row)">驳回</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- <el-tab-pane label="个人借用审批">
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
      :current-page="currentPage"
      background
      layout="total, prev, pager, next, jumper"
      :total="totalcount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

import { nestInfo, nestChange, nestRefuse } from '@/api/out'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        审批中: 'gray',
        审批通过: 'success',
        审批失败: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      nestLoad: true,
      currentPage: 1,
      pagesize: 10,
      totalcount: 0,
      datalist: [],
      keyword: '',
      checked1: false,
      // checked2: false,
      tabPosition: 'left',
      tableData1: [],
      tableData2: []
    }
  },
  mounted() {
    // nestInfo().then(res => {
    //   console.log(res)
    // })
    this.getdatalist()
  },
  methods: {
    getdatalist() {
      var params = {}
      nestInfo(params).then(res => {
        this.listLoading = true
        this.datalist = res.data.data.list
        this.totalcount = res.data.data.list.length
        console.log(res.data.data.list.length)
        var data = []
        this.datalist.forEach((item, index) => {
          item.num = index + 1
          if (index >= (this.pagesize * (this.currentPage - 1))) {
            if (data.length < this.pagesize) {
              data.push(item)
            }
          }
        })
        this.tableData1 = data
        this.nestLoad = false
        console.log(res.data)
        console.log(this.tableData1)
      })
    },
    getpagedatalist() {
      var data = []
      var alldata = []
      this.datalist.forEach(item => {
        if (item.job_number.indexOf(this.keyword) !== -1) {
          alldata.push(item)
        }
      })
      alldata.forEach((item, index) => {
        if (index >= (this.pagesize * (this.currentPage - 1))) {
          if (data.length < this.pagesize) {
            data.push(item)
          }
        }
      })
      this.tableData1 = data
    },
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) /* 每页下拉显示数据*/
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
      this.getpagedatalist()
    },
    success(row) {
      this.$confirm('此操作将通过该设备带出申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          'id': row.id
        }
        console.log(params)
        nestChange(params).then(res => {
          console.log(res)
          if (res.status == '200') {
            this.getdatalist()
            this.$notify({
              title: '成功',
              message: '审批成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          type: 'info',
          message: '已取消审批'
        })
      })
    },
    back(row) {
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: ''
      }).then(({ value }) => {
        var param = {
          'id': row.id,
          'reason': value
        }
        nestRefuse(param).then(res => {
          console.log(res)
          if (res.status == '200') {
            this.getdatalist()
            this.$notify({
              title: '成功',
              type: 'success',
              message: '驳回成功'
            })
          } else {
            this.$notify({
              title: '失败',
              type: 'info',
              message: '请输入驳回原因'
            })
          }
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
      return row.lend_status === value
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

