<template>
  <div class="app-container">
    <div style="display: inline-block">
      <el-card class="box-card">
        <div id="bar-img" style="width: 655px;height:375px;"></div>
      </el-card>
      <el-card class="box-card" style="margin-top:10px;">
        <div id="pie-img" style="width: 550px;height:230px;"></div>
      </el-card>
    </div>
    <div style="display: inline-block;margin-left: 20px">
      <el-card class="box-card">
        <el-form size="mini" :model="bizProduct" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-cascader
              placeholder="请选择分类查询"
              :options="options"
              clearable
              :props="{ checkStrictly: true,expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="物资名称" v-model="bizProduct.name" clearable @clear="findAll"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="findAll">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="page.data.records"
          border
          height="555"
          style="width: 100%">
          <el-table-column
            label="图片"
            width="60px">
            <template slot-scope="scope">
              <img style="height: 21px; width: 21px; cursor: pointer;"
                   :src="'https://www.zykhome.club/'+scope.row.imageUrl"/>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            prop="name"/>
          <el-table-column
            label="规格"
            prop="model"/>
          <el-table-column
            label="库存">
            <template slot-scope="scope">
              <el-tag
                disable-transitions type="success" closable>{{scope.row.stock}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位"/>
        </el-table>
        <el-pagination
          style="margin-top: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[9, 10, 15, 20]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.data.total">
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {findAll, findCategory} from "@/api/repertory";

  export default {
    name: "Repertory",
    data() {
      return {
        current: 1,
        size: 9,
        page: {
          data: {
            records: []
          }
        },
        options: [],
        bizProduct: {
          oneCategoryId: null,
          twoCategoryId: null,
          threeCategoryId: null,
          name: null
        }
      }
    },
    methods: {
      findAll() {
        findAll(this.current, this.size, this.bizProduct).then(response => {
          this.page = response
          this.bar()
          this.pie()
        })
      },
      findCategory() {
        findCategory().then(response => {
          this.options = this.getTreeData(response.data)
        })
      },
      getTreeData(data) {
        // 循环遍历json数据
        for (var i = 0; i < data.length; i++) {
          if (data[i].children.length < 1) {
            // children若为空数组，则将children设为undefined
            data[i].children = undefined;
          } else {
            // children若不为空数组，则继续 递归调用 本方法
            this.getTreeData(data[i].children);
          }
        }
        return data;
      },
      handleSizeChange(val) {
        this.size = val
        this.findAll();
      },
      handleCurrentChange(val) {
        this.current = val
        this.findAll();
      },
      bar() {
        let myChart = this.$echarts.init(document.getElementById('bar-img'))
        let option = {
          title: {
            text: '库存条形图',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['库存量']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            data: Array.from(this.page.data.records, ({name}) => name),
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '库存量',
              type: 'bar',
              data: Array.from(this.page.data.records, ({name, stock}) => {
                return {name: name, value: stock}
              }),
              showBackground: true,
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params) {
                    let colorList = ['#0780cf',
                      '#fa6d1d',
                      '#ac2026',
                      '#701866',
                      '#d22e8d',
                      '#fe8463',
                      '#a195c5',
                      '#fad860',
                      '#f3a43b',
                      '#94A25E',
                      '#808C51',
                      '#6F6F6F',
                      '#9B9B43',
                      '#B9B925',
                      '#00B1DD',
                      '#625885',
                      '#65A23B',
                      '#43899B',
                      '#5EC01D',
                      '#A2A23B'];
                    return colorList[params.dataIndex];
                  },
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}\n{c}'
                  }
                },
                //鼠标悬停时：
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
            }
          ]
        };
        myChart.setOption(option);
      },
      pie() {
        let myChart = this.$echarts.init(document.getElementById('pie-img'))
        let option = {
          title: {
            text: '库存占比图',
            left: "left"
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            right: 10,
            top: 20,
            bottom: 20,
            data: Array.from(this.page.data.records, ({name}) => name),
            selected: Array.from(this.page.data.records, ({name}) => name)
          },
          series: [
            {
              name: "物资名称",
              type: "pie",
              radius: "55%",
              center: ["40%", "50%"],
              data: Array.from(this.page.data.records, ({name, stock}) => {
                return {name: name, value: stock}
              }),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      handleChange(value) {
        let ids = Array.from(value)
        this.bizProduct.oneCategoryId = ids[0]
        this.bizProduct.twoCategoryId = ids[1]
        this.bizProduct.threeCategoryId = ids[2]
        this.findAll()
      }
    },
    created() {
      this.findAll()
      this.findCategory()
    }
  }
</script>

<style scoped>

</style>
