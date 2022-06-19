<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-form :model="FormData" :rules="rules" label-width="120px" ref="updateForm">
          <el-form-item label="编号:" >
            <el-input v-model="FormData.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="学生姓名:" prop="studentId" >
            <el-select v-model="FormData.studentName" disabled>
              <el-option v-for="(one) in formCfg.studentList"
                         :key="one.id"
                         :label="one.realName"
                         :value="one.realName"
                         disabled>
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="考试名称:" prop="examName">
            <el-input v-model="FormData.examName"></el-input>
          </el-form-item>
          <el-form-item label="语文成绩:" prop="cnScore">
            <el-input v-model="FormData.cnScore"></el-input>
          </el-form-item>
          <el-form-item label="数学成绩:" prop="mathScore">
            <el-input v-model="FormData.mathScore"></el-input>
          </el-form-item>
          <el-form-item label="英语成绩:" prop="enScore">
            <el-input v-model="FormData.enScore"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="doSubmit" type="primary">修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "updateScore",
  computed:{
    idToUpdate(){
      return this.$route.query.idToUpdate
    }
  },
  data(){
    //自定义校验规则
    const validateNum=(rule,value,cb)=>{
      let numReg=/^(\d+)$|^(\d+\.\d+)$/;
      if(!numReg.test(value)){
        cb(new Error("请输入数字值"))
      }else{
        cb()
      }
    }
    return{
      FormData:{
        id:-1,
        studentName:'',
        studentId:'',
        examName:'',
        cnScore:'',
        enScore:'',
        mathScore:''
      },
      rules:{
        studentId: [
          {required: true, message: '请输入学生学号',trigger: 'blur'}
        ],
        studentName: [
          {required: true, message: '请输入学生学号',trigger: 'blur'}
        ],
        examName: [
          {required: true, message: '请输入考试名称',trigger: 'blur'}
        ],
        cnScore: [
          {required: true, message: '请输入语文成绩',trigger: 'blur'},
          {validator:validateNum, trigger:'blur'}
        ],
        mathScore: [
          {required: true, message: '请输入数学成绩',trigger: 'blur'},
          {validator:validateNum, trigger:'blur'}
        ],
        enScore: [
          {required: true, message: '请输入英语成绩',trigger: 'blur'},
          {validator:validateNum, trigger:'blur'}
        ]
      },
      formCfg:{
        studentList:[]
      }
    }
  },
  methods:{
    doSubmit(){
      this.$refs["updateForm"].validate((valid) =>{
        if(!valid){
          return
        }
        this.$appJsonPost({
          url:'score/updateById',
          data:this.FormData
        }).then(result => {
          this.$message.success(result.data)
          this.$refs["updateForm"].resetFields()
          this.$router.replace("/score/manage")
        }).catch(reason => {})
      })
    }
  },
  mounted() {
    this.$doGet({
      url:'/student/selectAll'
    }).then(result=>{
      this.formCfg.studentList=result.data
      // this.FormData.studentId=result.data[0].id
      return Promise.resolve()
    }).then(result =>{
      this.$doGet({
        url:'/score/selectById?id='+this.idToUpdate
      }).then(r=>{
        console.log(r.data)
        this.FormData=r.data
      })
    })
  }
}
</script>

<style scoped>

</style>
