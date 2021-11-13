<template>
  <div class="user-container">
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="700px"
    >
      <el-form ref="form" :model="edInf" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="edInf.username" class="width-1" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="edInf.phoneNumber" class="width-2" />
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="edInf.email" class="width-2" />
        </el-form-item>
        <el-form-item label="所属组织">
          <el-select v-model="edInf.belongOrg" placeholder="请选择" class="select2">
            <el-option
              v-for="item in choose"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="查看详情"
      :visible.sync="dialogVisible2"
      width="700px"
    >
      {{ detailInf }}
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-card>
          <div class="userTitle">
            <span><b>用户管理</b></span>
          </div>
          <div class="userFont">
            <span>用户总数：</span>
            <countTo :start-val="startVal" :end-val="userVal" :duration="2000" class="userNum" />
            <el-input v-model="keyword" placeholder="请输入要搜索的用户名" class="userInput">
              <el-button slot="append" icon="el-icon-search" @click="search" />
            </el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="userTable">
      <el-col :span="23">
        <el-card>
          <el-table
            ref="singleTable"
            v-loading="listLoading"
            :data="tableData"
            style="width: 100%"
            stripe
            height="550"
          >
            <el-table-column label="序号" type="index" width="70" />
            <el-table-column label="用户名" width="100">
              <template slot-scope="scope">
                {{ scope.row.trueName }}
              </template>
            </el-table-column>
            <el-table-column label="电话" width="130">
              <template slot-scope="scope">
                {{ scope.row.phoneNumber }}
              </template>
            </el-table-column>
            <el-table-column label="邮箱地址" width="250">
              <template slot-scope="scope">
                {{ scope.row.email }}
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="200">
              <template slot-scope="scope">
                {{ scope.row.enterTime }}
              </template>
            </el-table-column>
            <el-table-column label="所属组织" width="100">
              <template slot-scope="scope">
                {{ scope.row.belongOrg }}
              </template>
            </el-table-column>
            <el-table-column label="租借情况" width="80" align="center">
              <template slot-scope="scope">
                {{ scope.row.situation }}
                <el-button size="mini" @click="detail(scope.row)">详情</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="信用分" width="120">
              <template slot-scope="scope">
                <el-tag size="small">{{ scope.row.creditPoint }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
              <template slot-scope="scope">
                <el-tag effect="plain" type="">
                  {{ scope.row.state }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column property="authority" label="权限" width="130">
              <template slot-scope="scope">
                <el-select v-model="scope.row.role" size="mini" @change="handleRole(scope.row)">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="300"
            >
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="reset(scope.row)">密码重置</el-button>
                <!-- <el-button type="info" size="mini" @click="edit_user(scope.row)">编辑</el-button> -->
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
// import { getUser, userNum, changePassword } from '@/api/getUser'
import { getUser, changePassword, changeRole, userDel, getDetail } from '@/api/getUser'
export default {
  components: { countTo },
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      totalcount: 0,
      datalist: [],
      keyword: '',
      listLoading: true,
      dialogVisible: false,
      dialogVisible2: false,
      form: {
        name: '',
        phone: '',
        email: ''
      },
      startVal: 0,
      userVal: 0,
      endVal2: 334,
      choose: '',
      options: [{
        value: '普通用户',
        label: '普通用户'
      }, {
        value: '组织管理员',
        label: '组织管理员'
      }, {
        value: '组织总管理',
        label: '组织总管理'
      }, {
        value: '后台管理员',
        label: '后台管理员'
      }, {
        value: '后台总管理',
        label: '后台总管理'
      }],
      value: '普通用户',
      tableData: [],
      currentRow: null,
      rowInfo: {},
      token: '',
      editInfo: {
        username: '',
        phoneNumber: '',
        belongOrg: '',
        email: ''
      },
      edInf: {
        username: '',
        phoneNumber: '',
        belongOrg: '',
        email: ''
      },
      detailInf: []
    }
  },
  mounted() {
    this.getdatalist()
    // getUser().then(res => {
    //   console.log(res)
    //   this.tableData = res.data.data.list
    //   if (this.tableData) {
    //     this.listLoading = false
    //   }
    // })
  },
  methods: {
    getdatalist() {
      var params = {}
      getUser(params).then(res => {
        this.listLoading = true
        this.datalist = res.data.data.list
        this.totalcount = res.data.data.list.length
        this.userVal = res.data.data.list.length
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
        this.listLoading = false
        console.log(res.data)
        console.log(this.tableData)
      })
    },
    search() {
      this.getpagedatalist()
    },
    getpagedatalist() {
      var data = []
      var alldata = []
      this.datalist.forEach(item => {
        if (item.trueName.indexOf(this.keyword) !== -1) {
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
      this.tableData = data
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
    handleRole(row) {
      var params = {
        'username': row.username,
        'changeRole': row.role
      }
      changeRole(params).then(res => {
        console.log(res)
      })
    },
    deleteSubmit(row) {
      this.$confirm('此操作将删除该用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          'username': row.username
        }
        userDel(params).then(res => {
          console.log(res)
          if (res.status == '200') {
            this.getdatalist()
            this.$notify({
              title: '成功',
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    detail(row) {
      this.dialogVisible2 = true
      var params = {
        'username': row.username
      }
      getDetail(params).then(res => {
        console.log(res.data.data)
        this.detailInf = res.data.msg
      })
    },
    edit_user(row) {
      this.dialogVisible = true
      this.edInf.username = row.trueName
      this.edInf.email = row.email
      this.edInf.phoneNumber = row.phoneNumber
      this.edInf.belongOrg = row.belongOrg
    },
    reset(row) {
      this.$prompt('请输入新的密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: ''
      }).then(({ value }) => {
        this.editInfo.username = row.username
        const systemName = JSON.parse(sessionStorage.getItem('username'))
        if (this.editInfo.username == systemName) {
          this.$notify({
            title: '失败',
            type: 'error',
            message: '不能在此修改自己的密码'
          })
        } else {
          var params = {
            'username': this.editInfo.username,
            'newPassword': value
          }
          changePassword(params).then(res => {
            console.log(res)
            if (res) {
              this.$notify({
                title: '成功',
                type: 'success',
                message: '重置成功'
              })
            }
          })
        }
      }).catch(() => {
        this.$notify({
          title: '取消',
          type: 'info',
          message: '取消输入'
        })
      })
    }
  },
  authority() {
    console.log('1')
    // this.editInfo.role = row.
    // var params = {
    //   'username': this.editInfo.username,
    //   'changeRole': this.editInfo.
    // }
  }
}
</script>

<style lang="scss" scoped>
.width {
  &-1 {
    width: 50%;
  }
  &-2 {
    width:80%;
  }
}
.user-container {
  margin-top: 20px;
}
.userTitle {
  font-size: 22px;
  margin-left: 10px;
}
.userTable {
  margin-top: 15px;
}
.newUser {
  margin-left: 30px;
}
.deleteUser {
  margin-top: 2px;
}
.userIcon {
  margin-right: 15px;
  opacity: 0.7;
}
.userInput {
  width: 250px;
  margin-right: 20px;
}
.row1 {
  margin-top: 15px;
}
.pagination {
  margin-top: 10px;
  margin-left: 20px;
}
.userTag {
  margin-right: 10px;
}
.userFont {
  margin-left: 10px;
  margin-top: 20px;
  font-size: 18px;
}
.userNum {
  font-size: 26px;
  margin-right: 20px;
  font-weight: bold;
  color: #000000;
  opacity: 0.6;
}
</style>
