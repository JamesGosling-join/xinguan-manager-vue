<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input placeholder="请输入部门查询" v-model="name" class="input-with-select"
                  clearable @clear="fetchData" style="width: 500px">
          <el-button slot="append" icon="el-icon-search" @click="fetchData"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="dialogFormVisible = true"><i class="el-icon-circle-plus-outline"></i>添加
        </el-button>
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
        label="ID"
        prop="id"
        width="40px">
      </el-table-column>
      <el-table-column
        label="办公电话"
        prop="phone"
        width="150%"/>
      <el-table-column
        label="部门名"
        prop="name"
        width="150%"/>
      <el-table-column
        label="人数"
        sortable
        width="80%">
        <template slot-scope="scope">
          <el-tag
            disable-transitions type="success">{{scope.row.count}}人
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        sortable
        width="150%"/>
      <el-table-column
        prop="modifiedTime"
        label="修改时间"
        sortable
        width="150%"/>
      <el-table-column
        prop="username"
        label="部门主任"
        width="200%"/>
      <el-table-column
        prop="address"
        label="地址"
        width="200%"/>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row.id)">
            <i class="el-icon-edit">编辑</i>
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row.id)">
            <i class="el-icon-delete">删除</i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[7, 10, 15, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.data.total">
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="900px">
      <el-form :model="departmentVO" :rules="rules" ref="departmentVO">
        <el-form-item label="部门名称" prop="name" label-width="80px">
          <el-input v-model="departmentVO.name"></el-input>
        </el-form-item>
        <el-form-item label="部门主任"
                      prop="mgrId"
                      label-width="80px">
          <el-select v-model="departmentVO.mgrId" placeholder="请选择部门主任">
            <el-option :label="user.name" :value="user.id" v-for="user in users"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="办公电话" prop="phone" label-width="80px">
          <el-input v-model="departmentVO.phone"></el-input>
        </el-form-item>
        <el-form-item label="办公地址" prop="address" label-width="80px">
          <el-input
            type="textarea"
            :rows="2"
            v-model="departmentVO.address">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('userVO')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {findAll, findDepartmentById, delById, add, updById, exportExcel} from "@/api/department";
  import {getMgrUser} from "@/api/user";

  export default {
    name: "Department",
    data() {
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!value) {
          return callback(new Error('请输入联系部门方式'))
        }
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error('请输入联系部门方式'))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入联系部门方式'))
            }
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
        name: null,
        departmentVO: {
          id: null,
          name: null,
          mgrId: null,
          phone: null,
          address: null
        },
        users: [],
        rules: {
          name: [
            {required: true, message: '请输入部门名称', trigger: 'blur'}
          ],
          mgrId: [
            {required: true, message: '请选择部门主任', trigger: 'change'}
          ],
          phone: [
            {required: true, trigger: 'blur', validator: checkPhone}
          ],
          address: [
            {required: true, message: '请输入办公地址', trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.fetchData()
      this.getUser()
    },
    methods: {
      handleSizeChange(val) {
        this.size = val
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.current = val
        this.fetchData();
      },
      handleEdit(id) {
        findDepartmentById(id).then(response => {
          this.departmentVO = response.data
          this.dialogFormVisible = true
        })
      },
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
      handleDelete(id) {
        delById(id).then(response => {
          this.success(response, '删除', false);
        })
      },
      edit() {
        if (this.departmentVO.id == null || this.departmentVO.id == '') {
          this.title = '添加部门'
          add(this.departmentVO).then(response => {
            this.success(response, '新增', true);
          })
        } else {
          this.title = '更新部门'
          updById(this.departmentVO).then(response => {
            this.success(response, '修改', true);
          })
        }
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
          this.getUser()
        } else {
          this.$notify.error({
            title: '失败',
            message: type + '失败'
          });
        }
      },
      getUser() {
        getMgrUser().then(response => {
          this.users = response.data
        })
      },
      fetchData() {
        findAll(this.current, this.size, this.name).then(response => {
          this.page = response
          this.size = this.page.data.size
          this.current = this.page.data.current
        })
      },
      changeUser() {
        this.fetchData()
        this.departmentVO = {
          id: null,
          name: null,
          mgrId: null,
          phone: null,
          address: null
        }
      },
      exportExcelUser() {
        exportExcel(this.name).then(response => {
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
    },
    watch: {
      dialogFormVisible(val) {
        if (!this.dialogFormVisible) {
          this.changeUser()
          this.rules.mgrId[0].required = false
        } else {
          this.rules.mgrId[0].required = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
