<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form :inline="true" :model="tbUserVO" ref="tbUserVO" class="demo-form-inline">
        <el-form-item label="部门"
                      prop="departmentId">
          <el-select v-model="tbUserVO.departmentId" placeholder="请选择部门" @change="fetchData" clearable
                     @clear="fetchData">
            <el-option
              v-for="department in departments"
              :key="department.id"
              :label="department.name"
              :value="department.id">
              <span style="float: left">{{ department.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
              <el-tag
                disable-transitions type="warning">{{ department.count }}人</el-tag>
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="tbUserVO.username" placeholder="请输入用户名查询" clearable @clear="fetchData"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="tbUserVO.email" placeholder="请输入邮箱查询" clearable @clear="fetchData"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="sex">
          <el-radio v-model="tbUserVO.sex" :label="0">男</el-radio>
          <el-radio v-model="tbUserVO.sex" :label="1">女</el-radio>
          <el-radio v-model="tbUserVO.sex" :label="null">全部</el-radio>
        </el-form-item>
        <el-form-item label="呢称"
                      prop="nickname">
          <el-input v-model="tbUserVO.nickname" placeholder="请输入呢称查询" clearable @clear="fetchData"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="resetForm('tbUserVO')"><i class="el-icon-refresh"></i>重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData"><i class="el-icon-search"></i>查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="dialogFormVisible = true"><i class="el-icon-plus"></i>添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="exportExcelUser"><i class="el-icon-download"></i>导出</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="page.data.records"
        border
        style="width: 100%">
        <el-table-column
          label="#"
          prop="id"
          width="100%">
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="username"
          width="200%"/>
        <el-table-column
          label="性别"
          width="100%">
          <template slot-scope="scope">
            <el-tag
              disable-transitions type="success">{{scope.row.sex==0?'帅哥':scope.row.sex==1?'美女':'保密'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属部门"
          sortable
          width="200%"/>
        <el-table-column
          prop="birth"
          label="生日"
          sortable
          width="200%"/>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200%"/>
        <el-table-column
          prop="phoneNumber"
          label="电话"
          width="200%"/>
        <el-table-column
          prop="phoneNumber"
          label="是否禁用"
          width="100%">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
              @change="updStatus(scope.row.status,scope.row.id)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row.id)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button
              size="mini"
              type="success">
              <i class="el-icon-setting"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[6, 10, 20, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.data.total">
      </el-pagination>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="900px">
        <el-form :model="userVO" :rules="rules" ref="userVO">
          <el-form-item label="用户名" prop="username" label-width="80px" style="display: inline-block">
            <el-input v-model="userVO.username"
                      :disabled="userVO.id!=null&&userVO.id!=''"
                      style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="部门"
                        prop="departmentId"
                        label-width="80px"
                        style="display: inline-block">
            <el-select v-model="userVO.departmentId" placeholder="请选择所属部门">
              <el-option :label="department.name" :value="department.id" v-for="department in departments"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="呢称" prop="nickname" label-width="80px" style="display: inline-block">
            <el-input v-model="userVO.nickname" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="性别"
                        prop="sex"
                        label-width="80px"
                        style="display: inline-block">
            <el-radio v-model="userVO.sex" :label="0">男</el-radio>
            <el-radio v-model="userVO.sex" :label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="密码" prop="password" label-width="80px" v-if="userVO.id==null||userVO.id==''">
            <el-input type="password" v-model="userVO.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" label-width="80px">
            <el-input v-model="userVO.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phoneNumber" label-width="80px">
            <el-input v-model="userVO.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birth" label-width="80px">
            <el-date-picker type="date" placeholder="选择出生日期" v-model="userVO.birth"
                            style="width: 350px"></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('userVO')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {getList, del, add, upd, getUser, exportExcel} from '@/api/user'
  import {getDepartment} from "@/api/department";

  export default {
    name: "User",
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!value) {
          return callback(new Error('请输入联系方式'))
        }
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error('请输入联系方式'))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入联系方式'))
            }
          }
        }, 100)
      };
      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'))
          }
        }, 100)
      };
      return {
        title: "",
        dialogFormVisible: false,
        page: {
          data: {
            records: []
          }
        },
        current: 1,
        size: 6,
        tbUserVO: {
          username: null,
          nickname: null,
          email: null,
          sex: null,
          departmentId: null,
        },
        userVO: {
          id: null,
          username: null,
          nickname: null,
          email: null,
          sex: null,
          departmentId: null,
          password: null,
          phoneNumber: null,
          birth: null
        },
        departments: [],
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          departmentId: [
            {required: true, message: '请选择所属部门', trigger: 'change'}
          ],
          nickname: [
            {required: true, message: '请输入呢称', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          email: [
            {required: true, trigger: 'blur', validator: checkEmail}
          ],
          phoneNumber: [
            {required: true, trigger: 'blur', validator: checkPhone}
          ],
          birth: [
            {type: 'date', required: true, message: '请填写出生日期', trigger: 'change'}
          ]
        }
      }
    },
    created() {
      this.fetchData()
      this.getDepartments()
    },
    watch: {
      dialogFormVisible(val) {
        if (!this.dialogFormVisible) {
          this.changeUser()
          this.rules.departmentId[0].required = false
          this.rules.birth[0].required = false
        } else {
          this.rules.departmentId[0].required = true
          this.rules.birth[0].required = true
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.edit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      fetchData() {
        getList(this.current, this.size, this.tbUserVO).then(response => {
          this.page = response
          this.size = this.page.data.size
          this.current = this.page.data.current
        })
      },
      handleSizeChange(val) {
        this.size = val
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.current = val
        this.fetchData();
      },
      getDepartments() {
        getDepartment().then(response => {
          this.departments = response.data
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.fetchData();
      },
      handleDelete(id) {
        del(id).then(response => {
          this.success(response, '删除', false);
        })
      },
      edit() {
        if (this.userVO.id == null || this.userVO.id == '') {
          this.title = '添加用户'
          add(this.userVO).then(response => {
            this.success(response, '新增', true);
          })
        } else {
          this.title = '修改用户'
          upd(this.userVO).then(response => {
            this.success(response, '修改', true);
          })
        }
      },
      changeUser() {
        this.fetchData()
        this.userVO = {
          username: null,
          nickname: null,
          email: null,
          sex: null,
          departmentId: null,
          password: null,
          phoneNumber: null,
          birth: null
        }
      },
      handleEdit(id) {
        getUser(id).then(response => {
          this.userVO = response.data
          this.userVO.birth = new Date(response.data.birth.replace(/-/g, "/"))
          this.dialogFormVisible = true
        })
      },
      updStatus(status, id) {
        upd({status: status, id: id}).then(response => {
          this.success(response, '修改', false);
        })
      },
      success(response, type, dialogFormVisible) {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: type + '成功',
            type: 'success'
          });
          if (dialogFormVisible) {
            this.dialogFormVisible = false
          }
          this.fetchData()
          this.getDepartments()
        } else {
          this.$notify.error({
            title: '失败',
            message: type + '失败'
          });
        }
      },
      exportExcelUser() {
        exportExcel(this.tbUserVO).then(response => {
          debugger
          let blob = new Blob([response], {type: 'application/xlsx'})
          let url = window.URL.createObjectURL(blob)
          const link = document.createElement('a') // 创建a标签
          link.href = url
          link.download = '用户信息表.xlsx' // 重命名文件
          link.click()
          URL.revokeObjectURL(url)
        })
      }
    }
  }
</script>
