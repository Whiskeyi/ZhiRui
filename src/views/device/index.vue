<template>
  <div class="device-container">
    <el-dialog
      title="设备详情"
      :visible.sync="dialogVisible1"
      width="40%"
    >
      <!-- <el-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          {{ '租用记录 ' + o }}
        </div>
      </el-card> -->
      <div class="block">
        <p><b>设备号：</b></p>
        {{ devID }}
        <p><b>设备图片：</b></p>
        <el-image style="height:280px; width: 300px" :src="devImgSrc" />
        <!-- <p><b>租借记录：</b></p>
        <el-timeline>
          <el-timeline-item timestamp="2020/2/9" placement="top">
            <el-card>
              <h4>租借 10days</h4>
              <p>XXX 租借于 2020/2/9 23:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2020/2/9" placement="top">
            <el-card>
              <h4>归还</h4>
              <p>XXX 归还于 2020/2/9 22:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2020/2/9" placement="top">
            <el-card>
              <h4>租借 10days</h4>
              <p>XXX 租借于 2020/2/9 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">返 回</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible2"
      width="700px"
    >
      <el-form ref="form" class="body" :model="form" label-width="120px">
        <el-form-item label="设备号">
          <el-input v-model="form.id" class="width-1" />
        </el-form-item>
        <el-form-item label="设备名">
          <el-input v-model="form.name" class="width-1" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.num" class="width-2" />
        </el-form-item>
        <el-form-item label="区分">
          <el-radio-group v-model="form.resource">
            <el-radio label="常规设备" />
            <el-radio label="贵重设备" />
            <el-radio label="保密设备" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="form.type" placeholder="请选择" class="select2">
            <el-option
              v-for="item in choose"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="借用人">
          <el-input v-model="form.name" class="width-2" />
        </el-form-item> -->
        <el-form-item label="描述">
          <el-input
            v-model="form.desc"
            class="width-3"
            :rows="6"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="changeInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-row type="flex" justify="center" class="topBar">
      <el-col :span="24">
        <el-input v-model="keyword" class="topBar-search" placeholder="请输入要查询的设备名" />
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button class="getIn" type="primary" size="medium" @click="
        ">设备入库<i class="el-icon-upload el-icon--right" /></el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="devList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" align="center" label="序号" width="70" />
      <el-table-column label="设备名" width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="设备数量" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column
        label="区分"
        width="120"
        align="center"
        :filters="[{ text: '贵重设备', value: '贵重设备' }, { text: '常规设备', value: '常规设备' }, { text:'保密设备', value: '保密设备'}]"
        :filter-method="filterCheck"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          {{ scope.row.distinguish }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类别" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="描述" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.describe }}
        </template>
      </el-table-column>
      <el-table-column label="请求盘点" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.quest }}
          <div>
            <el-link icon="el-icon-box" @click="quest">盘点</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" width="250">
        <template slot-scope="scope">
          {{ scope.row.enterTime }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="borrower" label="借用人" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.borrower }}
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" width="530">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="devDetail(scope.row)">查看详情</el-button>
          <!-- <el-button type="primary" size="mini">租借</el-button> -->
          <el-button size="mini" @click="edit_dev(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSubmit(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 15px"
      background
      :current-page="currentPage"
      layout="total, prev, pager, next, jumper"
      :total="totalcount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { devInfo, devSend, devChange, devDel } from '@/api/device'

export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      totalcount: 0,
      datalist: [],
      keyword: '',
      dialogVisible1: false,
      dialogVisible2: false,
      devList: [],
      devImgSrc: '',
      form: {
        id: '',
        name: '',
        num: '',
        resource: '',
        type: ['电子设备', '事务设备', '文档管理设备', '办公设备'],
        userName: '',
        sex: [],
        passwordA: '',
        passwordB: ''
      },
      choose: [{
        value: '电子设备',
        label: '电子设备'
      }, {
        value: '事务设备',
        label: '事务设备'
      }, {
        value: '文档管理设备',
        label: '文档管理设备'
      }, {
        value: '办公设备',
        label: '办公设备'
      }, {
        value: '其它',
        label: '其它'
      }],
      options: [{
        label: '组织',
        options: [{
          value: '组织1',
          label: '1'
        }, {
          value: '组织2',
          label: '2'
        }]
      }, {
        label: '个人',
        options: [{
          value: '个人1',
          label: '1'
        }, {
          value: '个人2',
          label: '2'
        }, {
          value: '个人3',
          label: '3'
        }, {
          value: '个人4',
          label: '4'
        }]
      }],
      value: '',
      visible: false,
      radio1: '',
      downloadLoading: false,
      listLoading: true,
      devID: ''
    }
  },
  mounted() {
    // devInfo().then(res => {
    //   this.devList = res.data.data.list
    //   if (this.devList) {
    //     this.listLoading = false
    //   }
    //   console.log(this.devList)
    // })
    this.getdatalist()
  },
  methods: {
    getdatalist() {
      var params = {}
      devInfo(params).then(res => {
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
        this.devList = data
        this.listLoading = false
        console.log(res.data)
        console.log(this.devList)
      })
    },
    edit_dev(row) {
      this.dialogVisible2 = true
      this.form.id = row.id
      this.form.name = row.name
      this.form.num = row.number
      this.form.resource = row.distinguish
      this.form.type = row.type
      this.form.desc = row.describe
    },
    changeInfo() {
      this.dialogVisible2 = false
      var params = {
        'id': this.form.id,
        'name': this.form.name,
        'num': this.form.num,
        'distinguish': this.form.resource,
        'type': this.form.type,
        'describe': this.form.desc
      }
      devChange(params).then(res => {
        console.log(res)
        if (res.status == '200') {
          this.getdatalist()
          this.$notify({
            title: '成功',
            type: 'success',
            message: '信息修改成功'
          })
        }
      })
    },
    storage() {
      this.$router.replace('/device/sto')
    },
    deleteSubmit(row) {
      this.$confirm('此操作将删除该设备信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var param = {
          'id': row.id
        }
        devDel(param).then(res => {
          console.log(res)
          if (res.status == '200') {
            this.getdatalist()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    quest() {
      this.$confirm('是否向设备持有者发送设备盘点请求?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          'username': 'zcj',
          'equName': '电脑',
          'lendId': '11'
        }
        devSend(params).then(res => {
          console.log(res)
        })
        this.$message({
          type: 'success',
          message: '请求成功!',
          center: true
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消请求',
          center: true
        })
      })
    },
    filterCheck(value, row) {
      return row.distinguish === value
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
    search() {
      this.getpagedatalist()
    },
    getpagedatalist() {
      var data = []
      var alldata = []
      this.datalist.forEach(item => {
        if (item.name.indexOf(this.keyword) !== -1) {
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
    devDetail(row) {
      this.dialogVisible1 = true
      this.devImgSrc = row.imageUrl
      this.devID = row.id
    }
  }
}
</script>

<style lang="scss" scoped>
.device {
	&-container {
		margin: 30px;
		font-size: 24px;
	}
}
.topBar {
    white-space: nowrap;
    margin-bottom: 15px;
	&-search {
		width: 260px;
	}
	&-radio {
		margin-left: 30px;
	}
}
.block {
  position: relative;
  text-align: center;
}
.getIn {
	position: absolute;
	right: 0;
}
.pagination {
  margin-top: 40px;
}
.is_delete {
    font-size: 18px;
    margin-left: 90px;
    position: absolute;
}
.devDialog {
    margin-left: 70px;
    margin-top: 35px;
}
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 80%px;
}
.select1 {
  width: 180px;
}
.select2 {
  margin-left: 20px;
  width: 120px;
}
.width {
  &-1 {
    width: 60%;
  }
  &-2 {
    width: 40%;
  }
  &-3 {
    width: 90%;
  }
}
.body{
    margin-top: 20px;
}
</style>
