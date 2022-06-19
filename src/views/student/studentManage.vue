<template>
<div>
  <section class="title-bar">
      <el-row>
        <el-col :span="5">
            <el-button @click="openAddDia" type="primary" icon="el-icon-plus">
              新增
            </el-button>
        </el-col>
        <el-col :span="19">
            <el-form :model="searchFormData" :inline="true">
              <el-form-item>
                <el-input type="text" placeholder="请输入学生姓名模糊检索"
                v-model="searchFormData.searchWord"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="doSearch" type="primary" >
                  查询
                </el-button>
              </el-form-item>
            </el-form>
        </el-col>
      </el-row>
  </section>
  <section>
<!--    学生表格 -->
    <el-table
      :data="tableData.rows"
      stripe
      border
      size="mini"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="系统编号"
      width="180">
      </el-table-column>
      <el-table-column
        prop="sno"
        label="学号"
      width="180">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="enrollTime"
        label="入学时间"
        width="180"
        >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
  <section>
<!--    分页-->
    <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handlePageNowChange"
      :current-page="searchFormData.pageNow"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="searchFormData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total">
    </el-pagination>
  </section>
<!--  新增学生对话框-->
  <add-student :addDiaVisible.sync="addDiaVisible" @addSuccess="handleAddSuccess"></add-student>
<!--  更新学生对话框-->
  <update-student :updateDiaVisible.sync="updateDiaVisible"
                  :idToUpdate.sync="idToUpdate"
                  @updateSuccess="handleUpdateSuccess"></update-student>
</div>
</template>

<script>
import addStudent from "@/views/student/addStudent";
import updateStudent from "@/views/student/updateStudent";
import {appJsonPost} from "@/network/request";

export default {
  name: "studentManage",
  data(){
      return{
        addDiaVisible: false,
        updateDiaVisible:false,
        idToUpdate:-1,
        //表格的查询条件
        searchFormData:{
          pageNow:1,
          pageSize:10,
          searchWord:''
        },
        tableData:{
          rows:[],
          total: 0
        }
      }
  },
  methods:{
    openAddDia() {
      this.addDiaVisible = true
    },
    doSearch(){
      //重新加载表格
      this.loadTable()
    },
    handleAddSuccess(){
      this.addDiaVisible =false
        //重新加载表格
        this.loadTable()
    },
    //获取分页查询数据
    loadTable(){
      this.$appJsonPost({
        url:'/student/selectPage',
        data: this.searchFormData
      }).then(result => {
        if(result.data && result.data.length>0){
          this.tableData.rows=result.data
          this.tableData.total=result.total
        }
      })
    },
    handleEdit(index,row){
      this.idToUpdate=row.id
      this.updateDiaVisible=true
    },
    handleDelete(index,row){
      this.$confirm("确认要删除吗？","提示",{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:"warning"
      }).then(()=>{
        console.log("点了确定")
        this.$doGet({
          url:'/student/deleteById',
          params:{"id":row.id}
        }).then(result=>{
          this.$message.success(result.data)
          this.loadTable()
        })
      })
        .catch(()=>{
          console.log("点了取消")
        })
    },
    handlePageSizeChange(pageSize){
      this.searchFormData.pageSize=pageSize
      this.loadTable()
    },
    //当前要前往第x页
    handlePageNowChange(pageNow){
      this.searchFormData.pageNow=pageNow
      this.loadTable()
    },
    handleUpdateSuccess(){
      this.updateDiaVisible =false
      //重新加载表格
      this.loadTable()
    }
  },
  components:{
    addStudent,
    updateStudent
  },
  mounted() {
    this.loadTable()
  }
}
</script>

<style scoped>

</style>
