<template>
<div>
  <el-dialog title="新增学生信息" :before-close="handleCancel" :visible="addDiaVisible">
    <el-form :model="FormData" :rules="rules" label-width="120px" ref="addForm">
      <el-form-item label="学号:" prop="sno">
        <el-input v-model="FormData.sno"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" prop="realName">
        <el-input v-model="FormData.realName"></el-input>
      </el-form-item>
      <el-form-item label="入学时间:" prop="enrollTime">
        <el-date-picker
         type="date"
        v-model="FormData.enrollTime" :editable="true"
                        prefix-icon="el-icon-date"

        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {appJsonPost} from "@/network/request";
import {saveItem} from "@/storage";
import {USER_TOKEN_KEY} from "@/config/constants";
import {log} from "util";

export default {
  name: "addStudent",
  data(){
    return{
      FormData:{
        sno:'',
        realName:'',
        enrollTime:''
      },
      rules:{
        sno: [
          {required: true, message: '请输入学生学号',trigger: 'blur'}
        ],
        realName: [
          {required: true, message: '请输入学生姓名',trigger: 'blur'}
        ],
        enrollTime: [
          {required: true, message: '请选择学生入学时间',trigger: 'blur'}
        ]
      }
    }
  },
  props:{
    addDiaVisible:{
      default: false
    }
  },
  methods:{
    handleCancel(){
        this.$refs["addForm"].resetFields()
        this.$emit("update:addDiaVisible",false)
    },

    onSubmit(){
      this.$refs["addForm"].validate((valid) =>{
        if(!valid){
          return
        }
        console.log(this.FormData.enrollTime)
        this.$appJsonPost({
          url:'student/add',
          data:this.FormData
        }).then(result => {
          this.$message.success(result.data)
          this.$refs["addForm"].resetFields()
          this.$emit("addSuccess")
        }).catch(reason => {})
      })
    }
  }
}
</script>

<style scoped>

</style>
