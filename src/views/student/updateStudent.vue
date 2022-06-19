<template>
<div>
  <el-dialog title="更新学生信息" :before-close="handleCancel"
             :visible="updateDiaVisible"
              @open="handleOpen">
    <el-form :model="FormData" :rules="rules" label-width="120px" ref="updateForm">
      <el-form-item label="系统编号:" prop="id">
        <el-input v-model="FormData.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="学号:" prop="sno">
        <el-input v-model="FormData.sno" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名:" prop="realName">
        <el-input v-model="FormData.realName"></el-input>
      </el-form-item>
      <el-form-item label="入学时间:" prop="enrollTime">
        <el-date-picker type="date"
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
export default {
  name: "updateStudent",
  data(){
    return{
      FormData:{
        id:-1,
        sno:'',
        realName:'',
        enrollTime:''
      },
      rules:{
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
    updateDiaVisible:{
      default: false
    },
    idToUpdate:{
      type:Number,
      required:true
    }
  },
  methods: {
    handleCancel() {
      this.$refs["updateForm"].resetFields()
      this.$emit("update:updateDiaVisible", false)
    },

    onSubmit() {
      this.$refs["updateForm"].validate((valid) => {
        if (!valid) {
          return
        }
        console.log(this.FormData.enrollTime)
        this.$appJsonPost({
          url: 'student/updateById',
          data: this.FormData
        }).then(result => {
          this.$message.success(result.data)
          this.$refs["updateForm"].resetFields()
          this.$emit("updateSuccess")
        }).catch(reason => {
        })
      })
    },
    handleOpen() {
      this.$doGet({
        url: 'student/selectById',
        params:{id:this.idToUpdate}
      }).then(result => {
        this.FormData=result.data
      }).catch(reason => {
      })
    }
  }
}
</script>

<style scoped>

</style>
