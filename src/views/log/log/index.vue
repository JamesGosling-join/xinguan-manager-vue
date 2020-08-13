<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form :inline="true" :model="logVO" ref="logVO" class="demo-form-inline">
        <el-form-item label="操作人"
                      prop="username">
          <el-input v-model="logVO.username" placeholder="操作人" clearable @clear="fetchData"></el-input>
        </el-form-item>
        <el-form-item label="IP地址"
                      prop="ip">
          <el-input v-model="logVO.ip" placeholder="IP地址" clearable @clear="fetchData"></el-input>
        </el-form-item>
        <el-form-item label="操作位置"
                      prop="location">
          <el-input v-model="logVO.location" placeholder="操作位置" clearable @clear="fetchData"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="resetForm('logVO')"><i class="el-icon-refresh"></i>重置</el-button>
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
          prop="id"
          width="40px"/>
        <el-table-column
          label="操作"
          prop="operation"
          width="150%"/>
        <el-table-column
          label="方法"
          prop="method"
          show-overflow-tooltip
          width="180%"/>
        <el-table-column
          label="参数"
          prop="params"
          width="100%"
          show-overflow-tooltip/>
        <el-table-column
          label="耗时"
          sortable
          width="120%">
          <template slot-scope="scope">
            <el-tag type="success">{{scope.row.time}}毫秒
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="location"
          label="操作地点"
          width="200%"/>
        <el-table-column
          prop="ip"
          label="IP地址"
          width="150%"/>
        <el-table-column
          prop="username"
          label="操作人"
          width="150%"/>
        <el-table-column
          prop="createTime"
          label="时间"
          sortable
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
    </el-card>
  </div>
</template>

<script>
  import {getLogList, deleteLogById} from "@/api/log";

  export default {
    name: "HandelLog",
    data() {
      return {
        page: {
          data: {
            records: []
          }
        },
        current: 1,
        size: 7,
        logVO: {
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
        getLogList(this.current, this.size, this.logVO).then(response => {
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
        deleteLogById(this.ids).then(response => {
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
        if (val.length > 0) {
          for (let v of val) {
            this.ids.push(v.id)
          }
          this.disabled = false
        } else {
          this.disabled = true
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
