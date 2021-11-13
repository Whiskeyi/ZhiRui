<template>
  <div>
    <el-dialog
      title="盘点详情"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <!-- <p><b>设备定位：</b></p>
      <div> {{ '浙江省杭州市西湖区留下街道318号' }} </div> -->
      <div class="block">
        <p><b>设备号：</b></p>
        {{ devID }}
        <p><b>设备图片：</b></p>
        <el-image style="height:280px; width: 300px" :src="devImg" />
      </div>
      <!-- <p><b>盘点时间：</b></p>
      <div> {{ '2021/4/19' }} </div> -->
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-row type="flex" justify="center">
      <el-col class="toryCard1" :span="23">
        <el-card>
          <div class="toryTitle"><b>设备盘点</b></div>
          <div class="toryFont">
            <!-- <span>设备待盘点：</span>
            <countTo :start-val="startVal" :end-val="endVal1" :duration="2000" class="toryNum" /> -->
            <span>盘点列表总数：</span>
            <countTo :start-val="startVal" :end-val="endVal2" :duration="2000" class="toryNum" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col class="toryList" :span="23">
        <el-card>
          <el-table
            ref="singleTable"
            v-loading="tableLoad"
            :data="tableData"
            style="width: 100%"
            stripe
            height="550"
          >
            <el-table-column
              label="序号"
              type="index"
              width="70"
              align="center"
            />
            <el-table-column
              label="设备名称"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.EquName }}
              </template>
            </el-table-column>
            <el-table-column
              label="设备数量"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.lendNumber }}
              </template>
            </el-table-column>
            <el-table-column
              label="租借人"
              width="150"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.lendPeo }}
              </template>
            </el-table-column>
            <el-table-column
              label="租借时间"
              align="center"
              width="220"
            >
              <template slot-scope="scope">
                {{ scope.row.startTime }}
              </template>
            </el-table-column>
            <el-table-column
              label="设备状态"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.equStatus }}
              </template>
            </el-table-column>
            <el-table-column
              label="设备区分"
              width="150"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.distinguish }}
              </template>
            </el-table-column>
            <el-table-column
              label="盘点进度"
              width="170"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.check }}
              </template>
            </el-table-column>
            <el-table-column
              label="审核人"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.checkPeo }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="400"
            >
              <template slot-scope="scope">
                <el-button type="info" size="mini" @click="detailCheck(scope.row)">详情</el-button>
                <el-button size="mini" @click="remind">提醒盘点</el-button>
                <el-button type="primary" size="mini" @click="passSubmit(scope.row)">通过审核</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :total="100"
          /> -->
          <el-pagination
            style="margin-top: 15px"
            background
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="totalcount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import { invenInf, invenCheck } from '@/api/inventory'

export default {
  components: { countTo },
  data() {
    return {
      tableLoad: true,
      currentPage: 1,
      pagesize: 10,
      totalcount: 0,
      datalist: [],
      dialogVisible: false,
      startVal: 0,
      endVal1: 34,
      endVal2: 0,
      tableData: [],
      devID: '',
      devImg: ''
    }
  },
  created() {
    this.getdatalist()
    // invenInf().then(res => {
    //   console.log(res)
    //   this.tableData = res.data.data.list
    // })
  },
  methods: {
    getdatalist() {
      var params = {}
      invenInf(params).then(res => {
        this.listLoading = true
        this.datalist = res.data.data.list
        this.totalcount = res.data.data.list.length
        this.endVal2 = res.data.data.list.length
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
        this.tableData = data
        this.tableLoad = false
        console.log(res.data)
        console.log(this.tableData)
      })
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
    getpagedatalist() {
      var data = []
      var alldata = []
      this.datalist.forEach(item => {
        if (item.EquName.indexOf(this.keyword) !== -1) {
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
      this.devList = data
    },
    passSubmit(row) {
      this.$confirm('此操作将通过该设备盘点审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          'id': row.id
        }
        invenCheck(params).then(res => {
          console.log(res)
          if (res.status == '200') {
            this.getdatalist()
            this.$notify({
              title: '成功',
              type: 'success',
              message: '审核成功!'
            })
          }
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          type: 'info',
          message: '已取消审核'
        })
      })
    },
    remind() {
      this.$confirm('此操作将发送提醒信息给用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          title: '成功',
          type: 'success',
          message: '提醒成功!'
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          type: 'info',
          message: '已取消提醒'
        })
      })
    },
    detailCheck(row) {
      this.dialogVisible = true
      this.devID = row.id
      this.devImg = row.imageUrl
    }
  }
}
</script>

<style scoped>
.toryTitle {
  font-size: 22px;
}
.toryCard1 {
  margin-top: 20px;
}
.toryFont {
  margin-top: 20px;
  font-size: 18px;
}
.toryNum {
  font-size: 26px;
  margin-right: 20px;
  font-weight: bold;
  color: #000000;
  opacity: 0.6;
}
.toryList {
  margin-top: 20px;
}
.pagination {
  margin-top: 20px;
}
</style>
