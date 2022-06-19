<template>
<div class="main">
  <el-container class="outer-container">
    <el-header><header-com/></el-header>
    <el-container>
      <el-aside :width="asideWith">
        <side-bar @update:asideWith="updateAsideWith"></side-bar>
      </el-aside>
      <el-container>
        <el-main>
          <tabs :opened-tabs="openedTabs"></tabs>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </el-container>
</div>

</template>

<script>
import headerCom from "@/components/headerCom";
import sideBar from "@/components/sideBar";
import tabs from "@/components/tabs";
export default {
  name: "main",
  computed:{
    openedTabs(){
      return this.$store.getters.openedTabs
    }
  },
  data(){
    return{
      asideWith: '160px'
    }
  },
  components:{
    headerCom,
    sideBar,
    tabs
  },
  methods:{
    //接受子组件传来的值并更新asideWith的值
    updateAsideWith(value){
      this.asideWith=value
    }
  }
}
</script>

<style scoped>
.main,.outer-container{
  height: 100%;
}
.el-header{
  background-color: #0a366B;
  color: #FFF;
  padding-left: 0;
}
.el-aside{
  background-color: #003c7f;
}
.el-main{
  padding: 10px;

}
</style>
