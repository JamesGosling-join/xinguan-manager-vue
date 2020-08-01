<template>
  <div class="app-container">
    <el-form :inline="true" :model="loginLogVO" ref="loginLogVO" class="demo-form-inline">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="loginLogVO.username" placeholder="请输入用户名查询" clearable @clear="fetchData"></el-input>
      </el-form-item>
      <el-form-item label="IP地址"
                    prop="ip">
        <el-input v-model="loginLogVO.ip" placeholder="请输入IP查询" clearable @clear="fetchData"></el-input>
      </el-form-item>
      <el-form-item label="登入地址"
                    prop="location">
        <el-input v-model="loginLogVO.location" placeholder="请输入登入地址查询" clearable @clear="fetchData"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="resetForm('loginLogVO')"><i class="el-icon-refresh"></i>重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData"><i class="el-icon-search"></i>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteLog" :disabled="disabled"><i class="el-icon-delete"></i>批量</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="page.data.records"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="40px"/>
      <el-table-column
        label="ID"
        prop="id"
        width="80%"/>
      <el-table-column
        label="登入用户"
        prop="username"
        width="180%"/>
      <el-table-column
        prop="loginTime"
        label="登入时间"
        width="150%"/>
      <el-table-column
        prop="location"
        label="登入地点"
        width="300%"/>
      <el-table-column
        prop="ip"
        label="IP地址"
        width="200%"/>
      <el-table-column
        prop="userSystem"
        label="操作系统"
        width="150%"/>
      <el-table-column
        prop="userBrowser"
        label="浏览器"
        width="150%"/>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
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
  </div>
</template>

<script>
  import {getLoginList, deleteLoginLogById} from "@/api/log";

  export default {
    name: "LoginLog",
    data() {
      return {
        page: {
          data: {
            records: []
          }
        },
        current: 1,
        size: 7,
        loginLogVO: {
          username: null,
          ip: null,
          location: null
        },
        ids: [],
        disabled: true
      };
    },
    methods: {
      fetchData() {
        getLoginList(this.current, this.size, this.loginLogVO).then(response => {
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
      handleDelete(id) {
        this.ids = [id];
        this.deleteLog();
      },
      deleteLog() {
        deleteLoginLogById(this.ids).then(response => {
          if (response.success) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
            this.fetchData()
            this.getDepartments()
          } else {
            this.$notify.error({
              title: '失败',
              message: '删除失败'
            });
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.fetchData()
      },
      handleSelectionChange(val) {
        if(val.length>0) {
          for (let v of val) {
            this.ids.push(v.id)
          }
          this.disabled=false
        }else {
          this.disabled=true
        }
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>

<style scoped>

</style>
