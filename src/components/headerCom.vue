<template>
<div class="header-com">
  <el-row>
    <el-col :span="10">
<!--      <img class="banner_img" src="../static/banner.jpg">-->
      <h2 class="H-title">学生成绩管理系统</h2>
    </el-col>
    <el-col :span="4" :offset="10" class="user-info">
      欢迎，<span class="user-name">{{userInfo.userName}}</span>
    </el-col>
  </el-row>
</div>

</template>

<script>


export default {
  name: "headerCom",
  computed:{
    userInfo(){
      return this.$store.getters.userInfo
    }
  }
}
</script>

<style scoped>
.banner_img{
  width: 100px;
  height: 50px;
}
.H-title {
  font-size:	20px;
  color: #FFFFFF;
  padding-top: 0;
  letter-spacing:3px;
}
.user-info{
  text-align: right;
  line-height: 60px;
}
.user-name{
  padding-left: 5px;
  color: red;
  font-weight: bold;
}
</style>
